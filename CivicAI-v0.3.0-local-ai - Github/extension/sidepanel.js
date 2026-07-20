const supportedLanguages = ["en", "it", "es", "fr", "de"];

function message(key, substitutions) {
  return chrome.i18n.getMessage(key, substitutions) || key;
}

function getLocale() {
  const uiLanguage = chrome.i18n.getUILanguage() || "en";
  const language = uiLanguage.toLowerCase().split("-")[0];
  return supportedLanguages.includes(language) ? language : "en";
}

const language = getLocale();
const locale = chrome.i18n.getUILanguage() || language;
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

function compactSource(title, rawUrl) {
  try {
    const hostname = rawUrl ? new URL(rawUrl).hostname.replace(/^www\./, "") : "";
    const cleanTitle = (title || "").trim();
    if (cleanTitle && hostname && !cleanTitle.toLowerCase().includes(hostname.toLowerCase())) {
      return `${cleanTitle} · ${hostname}`;
    }
    return hostname || cleanTitle || message("pageSource");
  } catch {
    return (title || "").trim() || message("pageSource");
  }
}

async function loadPendingSelection() {
  const { civicaiPendingSelection } = await chrome.storage.local.get("civicaiPendingSelection");
  if (!civicaiPendingSelection) return;
  elements.sourceText.value = civicaiPendingSelection.text || "";
  elements.sourceMeta.textContent = compactSource(
    civicaiPendingSelection.sourceTitle,
    civicaiPendingSelection.sourceUrl
  );
}

function setStatus(text, type = "info") {
  elements.statusCard.textContent = text;
  elements.statusCard.className = `card status${type === "error" ? " error" : ""}`;
}

function hideStatus() {
  elements.statusCard.classList.add("hidden");
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
  if (text.length < 10) {
    setStatus(message("textTooShort"), "error");
    return;
  }

  elements.analyzeButton.disabled = true;
  setStatus(message("analyzing"));

  try {
    setStatus(message("analyzing"));

    let analyzeLocally;
    try {
      const module = await import("./local-ai.js");
      analyzeLocally = module.analyzeLocally;
    } catch (moduleError) {
      throw new Error(`Impossibile caricare il motore AI locale: ${moduleError.message}`);
    }

    const payload = await analyzeLocally(text, language);

    if (!payload.is_civic_issue) {
      elements.resultSection.classList.add("hidden");
      setStatus(payload.explanation || message("notCivic"), "error");
      return;
    }

    fillResult(payload);
    setStatus(message("analysisComplete"));
  } catch (error) {
    setStatus(message("serverError", error.message), "error");
  } finally {
    elements.analyzeButton.disabled = false;
  }
}

elements.analyzeButton.addEventListener("click", analyze);

elements.demoButton.addEventListener("click", () => {
  elements.sourceText.value = message("demoText");
  elements.sourceMeta.textContent = message("localExample");
  hideStatus();
});

elements.copyButton.addEventListener("click", async () => {
  const text = `${message("subjectPrefix")}: ${elements.subject.value}\n\n${elements.reportDraft.value}`;
  await navigator.clipboard.writeText(text);
  setStatus(message("copied"));
});

elements.resetButton.addEventListener("click", async () => {
  elements.sourceText.value = "";
  elements.sourceMeta.textContent = "";
  elements.resultSection.classList.add("hidden");
  hideStatus();
  await chrome.storage.local.remove("civicaiPendingSelection");
});



chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName !== "local") return;
  const selection = changes.civicaiPendingSelection?.newValue;
  if (!selection) return;

  elements.sourceText.value = selection.text || "";
  elements.sourceMeta.textContent = compactSource(
    selection.sourceTitle,
    selection.sourceUrl
  );
  elements.resultSection.classList.add("hidden");
  hideStatus();
});

loadPendingSelection();
