const supportedLanguages = ["en", "it", "es", "fr", "de"];
const MIN_INPUT_LENGTH = 10;
const MAX_INPUT_LENGTH = 5000;
const PENDING_SELECTION_PREFIX = "civicaiPendingSelection:";

let inputRevision = 0;
let analysisRunId = 0;

function message(key, substitutions) {
  return chrome.i18n.getMessage(key, substitutions) || key;
}

function getLocale() {
  const uiLanguage = chrome.i18n.getUILanguage() || "en";
  const language = uiLanguage.toLowerCase().split("-")[0];
  return supportedLanguages.includes(language) ? language : "en";
}

const language = getLocale();
document.documentElement.lang = language;

document.querySelectorAll("[data-i18n]").forEach((element) => {
  element.textContent = message(element.dataset.i18n);
});
document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
  element.placeholder = message(element.dataset.i18nPlaceholder);
});

const elements = {
  sourceText: document.querySelector("#sourceText"),
  sourceMeta: document.querySelector("#sourceMeta"),
  analyzeButton: document.querySelector("#analyzeButton"),
  demoButton: document.querySelector("#demoButton"),
  statusCard: document.querySelector("#statusCard"),
  resultSection: document.querySelector("#resultSection"),
  confidenceBadge: document.querySelector("#confidenceBadge"),
  category: document.querySelector("#category"),
  subject: document.querySelector("#subject"),
  location: document.querySelector("#location"),
  urgency: document.querySelector("#urgency"),
  recipient: document.querySelector("#recipient"),
  urgencyReason: document.querySelector("#urgencyReason"),
  missingInfo: document.querySelector("#missingInfo"),
  reportDraft: document.querySelector("#reportDraft"),
  copyButton: document.querySelector("#copyButton"),
  resetButton: document.querySelector("#resetButton")
};

function sourceLabel(domain) {
  return (domain || "").trim() || message("pageSource");
}

function setStatus(text, type = "info") {
  elements.statusCard.textContent = text;
  elements.statusCard.className = `card status${type === "error" ? " error" : ""}`;
}

function hideStatus() {
  elements.statusCard.classList.add("hidden");
}

function invalidateInFlightAnalysis({ hideResult = true, hideCurrentStatus = true } = {}) {
  analysisRunId += 1;
  elements.analyzeButton.disabled = false;
  if (hideResult) elements.resultSection.classList.add("hidden");
  if (hideCurrentStatus) hideStatus();
}

function applySource(text, domain = "") {
  inputRevision += 1;
  invalidateInFlightAnalysis();
  elements.sourceText.value = text || "";
  elements.sourceMeta.textContent = sourceLabel(domain);
}

function pendingEntries(storageObject) {
  return Object.entries(storageObject)
    .filter(([key, value]) => key.startsWith(PENDING_SELECTION_PREFIX) && value)
    .sort(([left], [right]) => left.localeCompare(right));
}

async function removePendingKeys(keys) {
  if (keys.length) await chrome.storage.local.remove(keys);
}

async function loadPendingSelection() {
  const revisionBeforeRead = inputRevision;
  const stored = await chrome.storage.local.get(null);
  const entries = pendingEntries(stored);
  if (!entries.length) return;

  if (revisionBeforeRead === inputRevision) {
    const [, selection] = entries[entries.length - 1];
    applySource(selection.text, selection.sourceDomain);
  }

  await removePendingKeys(entries.map(([key]) => key));
}

function fillResult(result) {
  elements.category.value = result.category || "";
  elements.subject.value = result.subject || "";
  elements.location.value = result.location || "";
  elements.urgency.value = result.urgency || "medium";
  elements.recipient.value = result.suggested_recipient || "";
  elements.urgencyReason.value = result.urgency_reason || "";
  elements.missingInfo.value = (result.missing_information || []).join("\n");
  elements.reportDraft.value = result.report_draft || "";
  elements.confidenceBadge.textContent = `${Math.round((result.confidence || 0) * 100)}%`;
  elements.resultSection.classList.remove("hidden");
}

async function analyze() {
  const text = elements.sourceText.value.trim();
  if (text.length < MIN_INPUT_LENGTH) {
    setStatus(message("textTooShort"), "error");
    return;
  }
  if (text.length > MAX_INPUT_LENGTH) {
    setStatus(message("textTooLong", [String(MAX_INPUT_LENGTH)]), "error");
    return;
  }

  const runId = ++analysisRunId;
  const revisionAtStart = inputRevision;
  elements.analyzeButton.disabled = true;
  setStatus(message("analyzing"));

  try {
    const { analyzeLocally } = await import("./local-ai.js");
    const payload = await analyzeLocally(text, language);

    if (
      runId !== analysisRunId ||
      revisionAtStart !== inputRevision ||
      elements.sourceText.value.trim() !== text
    ) return;

    if (!payload.is_civic_issue) {
      elements.resultSection.classList.add("hidden");
      setStatus(payload.explanation || message("notCivic"), "error");
      return;
    }

    fillResult(payload);
    setStatus(message("analysisComplete"));
  } catch (error) {
    if (runId === analysisRunId && revisionAtStart === inputRevision) {
      setStatus(message("localEngineError", error.message), "error");
    }
  } finally {
    if (runId === analysisRunId) elements.analyzeButton.disabled = false;
  }
}

elements.analyzeButton.addEventListener("click", analyze);

elements.sourceText.addEventListener("input", () => {
  inputRevision += 1;
  invalidateInFlightAnalysis();
});

elements.demoButton.addEventListener("click", () => {
  applySource(message("demoText"), message("localExample"));
});

elements.copyButton.addEventListener("click", async () => {
  const text = `${message("subjectPrefix")}: ${elements.subject.value}\n\n${elements.reportDraft.value}`;
  await navigator.clipboard.writeText(text);
  setStatus(message("copied"));
});

elements.resetButton.addEventListener("click", async () => {
  inputRevision += 1;
  invalidateInFlightAnalysis();
  elements.sourceText.value = "";
  elements.sourceMeta.textContent = "";
  const stored = await chrome.storage.local.get(null);
  await removePendingKeys(pendingEntries(stored).map(([key]) => key));
});

chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName !== "local") return;
  const entries = pendingEntries(
    Object.fromEntries(
      Object.entries(changes).map(([key, change]) => [key, change.newValue])
    )
  );
  if (!entries.length) return;

  const [, selection] = entries[entries.length - 1];
  applySource(selection.text, selection.sourceDomain);
  removePendingKeys(entries.map(([key]) => key)).catch(console.error);
});

loadPendingSelection().catch(console.error);
