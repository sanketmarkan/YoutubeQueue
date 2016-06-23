var toolbarUI;

// Create the toolbar ui iframe and inject it in the current page
function initToolbar() {
  var iframe = document.createElement("iframe");
  iframe.setAttribute("src", chrome.runtime.getURL("popup/choose_beast.html"));
  iframe.setAttribute("style", "position: fixed; top: 0; right: 0; z-index: 10000; width: 700px; height: 500px;");
  document.body.appendChild(iframe);

  return toolbarUI = {
    iframe: iframe, visible: true
  };
}

function toggleToolbar(toolbarUI) {
  if (toolbarUI.visible) {
    toolbarUI.visible = false;
    toolbarUI.iframe.style["display"] = "none";
  } else {
    toolbarUI.visible = true;
    toolbarUI.iframe.style["display"] = "block";
  }
}

// Handle messages from the add-on background page (only in top level iframes)
if (window.parent == window) {
  chrome.runtime.onMessage.addListener(function(msg) {
    if (msg == "toggle-in-page-toolbar") {
      if (toolbarUI) {
        toggleToolbar(toolbarUI);
      } else {
        toolbarUI = initToolbar();
      }
    }
  });
}
