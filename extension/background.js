const MENU_ID = "civicai-analyze-selection";
const PENDING_SELECTION_PREFIX = "civicaiPendingSelection:";
let pendingStorageWrite = Promise.resolve();

function sourceDomain(rawUrl) {
  try {
    return new URL(rawUrl || "").hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

function replacePendingSelection(selectionKey, selection) {
  pendingStorageWrite = pendingStorageWrite.catch(() => {}).then(async () => {
    const stored = await chrome.storage.local.get(null);
    const previousKeys = Object.keys(stored).filter((key) =>
      key.startsWith(PENDING_SELECTION_PREFIX)
    );
    if (previousKeys.length) await chrome.storage.local.remove(previousKeys);
    await chrome.storage.local.set({ [selectionKey]: selection });
  });
  return pendingStorageWrite;
}

function createContextMenu() {
  chrome.contextMenus.removeAll(() => {
    chrome.contextMenus.create({
      id: MENU_ID,
      title: chrome.i18n.getMessage("menuAnalyze") || "Analyze with CivicAI",
      contexts: ["selection"]
    });
  });
}

chrome.runtime.onInstalled.addListener(createContextMenu);
chrome.runtime.onStartup.addListener(createContextMenu);

chrome.action.onClicked.addListener((tab) => {
  if (!tab?.windowId) return;
  chrome.sidePanel.open({ windowId: tab.windowId }).catch(console.error);
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId !== MENU_ID || !info.selectionText || !tab?.windowId) return;

  const selection = info.selectionText.trim();
  if (!selection) return;

  chrome.sidePanel.open({ windowId: tab.windowId }).catch(console.error);

  const selectionKey = `${PENDING_SELECTION_PREFIX}${Date.now()}:${crypto.randomUUID()}`;
  replacePendingSelection(selectionKey, {
    text: selection,
    sourceDomain: sourceDomain(info.pageUrl || tab.url || "")
  }).catch(console.error);
});
