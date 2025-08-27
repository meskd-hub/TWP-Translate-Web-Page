browser.browserAction.onClicked.addListener(() => {
  browser.tabs.executeScript({ file: "content.js" });
});
