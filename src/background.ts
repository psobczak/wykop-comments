chrome.tabs.onUpdated.addListener(async () => {

    const tab = await getCurrentTab();
    const url = tab.url ?? '';
    if (/https:\/\/www\.wykop\.pl\/wpis.*/.test(url)) {
        const tabId = tab.id!;

        chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ['dist/foreground.js'],
        });

        chrome.scripting.insertCSS({
            target: { tabId: tabId },
            files: ['dist/style.css']
        })

        chrome.storage.local.clear();
    }
})

chrome.tabs.onActivated.addListener(async () => {
    const tab = await getCurrentTab();
    const url = tab.url ?? '';
    if (/https:\/\/www\.wykop\.pl\/wpis.*/.test(url)) {
        const tabId = tab.id!;

        chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ['dist/foreground.js'],
        });

        chrome.scripting.insertCSS({
            target: { tabId: tabId },
            files: ['dist/style.css']
        })

        chrome.storage.local.clear();
    }
})

const getCurrentTab = async () => {
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}