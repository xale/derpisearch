const MENU_ITEM_ID_SEARCH_ARTIST = "search_artist";

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    title: "Search artist tag on Derpibooru",
    id: MENU_ITEM_ID_SEARCH_ARTIST,
    contexts: ["selection"],
  });
});

chrome.contextMenus.onClicked.addListener((itemData, tab) => {
  if (itemData.menuItemId === MENU_ITEM_ID_SEARCH_ARTIST) {
    const artistName = itemData.selectionText;
    if (!artistName) {
      return;
    }

    // TODO: sanitization
    const derpiSearchUrl = `https://derpibooru.org/search?q=artist:${artistName}`;
    chrome.tabs.create({
      windowId: tab.windowId,
      url: derpiSearchUrl,
      active: true,
    });
  }
});
