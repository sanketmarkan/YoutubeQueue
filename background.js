// Send a message to the current tab's content script.

var toolbarUI = null;

function toggleToolbar() {

	if (toolbarUI==null){
		var iframe = document.createElement("iframe");
		iframe.setAttribute("src", "https://www.youtube.com/embed/I0MT8SwNa_U?html5=1");
		iframe.setAttribute("style", "position: fixed; top: 0; right: 0; z-index: 10000; width: 560px; height: 315px;");
		iframe.setAttribute("width","560");
		iframe.setAttribute("height","315");
		iframe.setAttribute("frameborder","0");
		iframe.setAttribute("allowfullscreen", "1");

		// toolbarUI = {
		// 	"iframe": iframe, "visible": true
		// };
		// alert(typeof iframe);
		toolbarUI = iframe;
	}
	console.log(toolbarUI.style["top"]);
	chrome.tabs.query({ currentWindow: true }, function(tabs) {
	  for (var i = 0; i < tabs.length; i++) {
	  	chrome.tabs.sendMessage(tabs[i].id, {msg:"toggle-in-page-toolbar", toolbarUI: JSON.stringify(toolbarUI)});
	  }
	});
}

chrome.browserAction.onClicked.addListener(toggleToolbar);

// Handle connections received from the add-on toolbar ui iframes.
// chrome.runtime.onConnect.addListener(function (port) {
// 	if (port.sender.url == chrome.runtime.getURL("popup/choose_beast.html")) {
// 		// Handle port messages received from the connected toolbar ui frames.
// 		port.onMessage.addListener(toggleToolbar);
// 	}
// });
