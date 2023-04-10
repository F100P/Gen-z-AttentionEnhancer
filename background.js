chrome.browserAction.onClicked.addListener(function (tab) {
	chrome.tabs.executeScript({
		file: 'video_script.js',
	});
});
