import { env, pipeline } from "./lib/transformers.min.js";
import { CIVIC_CATEGORIES } from "./categories.js";

const MODEL_ID = "paraphrase-multilingual-MiniLM-L12-v2";
let extractorPromise;
let prototypePromise;

env.allowRemoteModels = false;
env.allowLocalModels = true;
env.localModelPath = chrome.runtime.getURL("models/");
env.backends.onnx.wasm.wasmPaths = chrome.runtime.getURL("lib/");

function extractor() {
  extractorPromise ??= pipeline("feature-extraction", MODEL_ID, {
    quantized: true
  });
  return extractorPromise;
}

async function embed(texts) {
  const model = await extractor();
  const output = await model(texts, { pooling: "mean", normalize: true });
  if (!Array.isArray(texts)) return Array.from(output.data);

  const rows = output.dims?.[0] || texts.length;
  const width = output.data.length / rows;
  return Array.from({ length: rows }, (_, i) =>
    Array.from(output.data.slice(i * width, (i + 1) * width))
  );
}

function cosine(a, b) {
  let dot = 0, aa = 0, bb = 0;
  for (let i = 0; i < Math.min(a.length, b.length); i++) {
    dot += a[i] * b[i];
    aa += a[i] * a[i];
    bb += b[i] * b[i];
  }
  return dot / (Math.sqrt(aa) * Math.sqrt(bb) || 1);
}

async function prototypes() {
  prototypePromise ??= (async () => {
    const out = {};
    for (const [key, category] of Object.entries(CIVIC_CATEGORIES)) {
      out[key] = await embed(category.examples);
    }
    return out;
  })();
  return prototypePromise;
}

function extractLocation(text) {
  const match = text.match(/\b(?:via|viale|piazza|corso|largo|street|road|avenue|calle|avenida|rue|boulevard|straße|strasse|platz)\s+[\p{L}0-9'’.-]+(?:\s+[\p{L}0-9'’.-]+)*/iu);
  return match?.[0] || "";
}

function highRisk(text) {
  return /scuola|school|escuela|école|schule|pericol|danger|peligro|dangereux|gefähr|cadere|fall|caer|tomber|stürz|incidente|accident|bambin|child|niñ|enfant|kind|aperto|open|ouvert|offen/i.test(text);
}

const copy = {
  en:{subject:"Report", greeting:"To the relevant office,", intro:"I would like to report the following issue:", request:"I kindly request an inspection and, where necessary, appropriate remedial action.", closing:"Kind regards", high:"The text indicates a possible safety risk.", medium:"The issue may require inspection by the relevant authority.", missing:["Municipality or city","Date or observation period","Any first-hand photographs"]},
  it:{subject:"Segnalazione", greeting:"Spett.le Ufficio competente,", intro:"desidero segnalare il seguente problema:", request:"Chiedo cortesemente una verifica e, ove necessario, un intervento di ripristino.", closing:"Cordiali saluti", high:"Il testo indica un possibile rischio per la sicurezza.", medium:"Il problema potrebbe richiedere una verifica dell’ente competente.", missing:["Comune","Data o periodo di osservazione","Eventuali fotografie scattate direttamente"]},
  es:{subject:"Aviso", greeting:"A la oficina competente:", intro:"Deseo comunicar el siguiente problema:", request:"Solicito una inspección y, cuando sea necesario, la intervención correspondiente.", closing:"Atentamente", high:"El texto indica un posible riesgo para la seguridad.", medium:"El problema podría requerir una inspección.", missing:["Municipio o ciudad","Fecha o periodo de observación","Posibles fotografías propias"]},
  fr:{subject:"Signalement", greeting:"À l’attention du service compétent,", intro:"Je souhaite signaler le problème suivant :", request:"Je vous remercie d’effectuer une vérification et, si nécessaire, d’intervenir.", closing:"Cordialement", high:"Le texte indique un risque possible pour la sécurité.", medium:"Le problème pourrait nécessiter une vérification.", missing:["Commune ou ville","Date ou période d’observation","Éventuelles photographies personnelles"]},
  de:{subject:"Meldung", greeting:"An die zuständige Stelle,", intro:"hiermit möchte ich folgendes Problem melden:", request:"Ich bitte um Prüfung und, falls erforderlich, um geeignete Abhilfemaßnahmen.", closing:"Mit freundlichen Grüßen", high:"Der Text weist auf ein mögliches Sicherheitsrisiko hin.", medium:"Das Problem könnte eine Prüfung erfordern.", missing:["Stadt oder Gemeinde","Datum oder Beobachtungszeitraum","Eventuelle eigene Fotos"]}
};

export async function analyzeLocally(text, language = "en") {
  const lang = copy[language] ? language : "en";
  const [textVector, allPrototypes] = await Promise.all([embed(text), prototypes()]);

  const scores = Object.entries(allPrototypes).map(([key, vectors]) => ({
    key,
    score: Math.max(...vectors.map(v => cosine(textVector, v)))
  })).sort((a, b) => b.score - a.score);

  const first = scores[0];
  const second = scores[1];
  const isCivic = first.key !== "not_civic" && first.score >= 0.30 && first.score - second.score >= 0.015;

  if (!isCivic) {
    return {
      is_civic_issue: false,
      explanation: CIVIC_CATEGORIES.not_civic.labels[lang],
      confidence: first.score
    };
  }

  const category = CIVIC_CATEGORIES[first.key];
  const location = extractLocation(text);
  const urgency = highRisk(text) ? "high" : "medium";
  const w = copy[lang];

  return {
    is_civic_issue: true,
    explanation: category.labels[lang],
    category: category.labels[lang],
    subject: `${w.subject}: ${category.labels[lang]}${location ? ` – ${location}` : ""}`,
    location,
    urgency,
    urgency_reason: urgency === "high" ? w.high : w.medium,
    suggested_recipient: category.recipients[lang],
    missing_information: [
      ...(location ? [] : [lang === "it" ? "Indirizzo preciso" : "Exact address"]),
      ...w.missing
    ],
    report_draft: `${w.greeting}\n\n${w.intro}\n\n${text}\n\n${w.request}\n\n${w.closing}`,
    confidence: Math.max(0, Math.min(1, first.score))
  };
}
