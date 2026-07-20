const MENU_ID = "civicai-analyze-selection";

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

  chrome.storage.local.set({
    civicaiPendingSelection: {
      text: selection,
      sourceUrl: info.pageUrl || tab.url || "",
      sourceTitle: tab.title || "",
      createdAt: new Date().toISOString()
    }
  }).catch(console.error);
});
