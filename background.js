// Send a message to the current tab's content script.
function toggleToolbar() {
  chrome.tabs.query({ currentWindow: true }, function(tabs) {
    for (var i = 0; i < tabs.length; i++) {
    	chrome.tabs.sendMessage(tabs[i].id, "toggle-in-page-toolbar");
    }
  });
}

// Handle the browser action button.
chrome.browserAction.onClicked.addListener(toggleToolbar);

// Handle connections received from the add-on toolbar ui iframes.
chrome.runtime.onConnect.addListener(function (port) {
  if (port.sender.url == chrome.runtime.getURL("popup/choose_beast.html")) {
    // Handle port messages received from the connected toolbar ui frames.
    port.onMessage.addListener(toggleToolbar);
  }
});
