"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
chrome.tabs.onUpdated.addListener(() => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const tab = yield getCurrentTab();
    const url = (_a = tab.url) !== null && _a !== void 0 ? _a : '';
    if (/https:\/\/www\.wykop\.pl\/wpis.*/.test(url)) {
        const tabId = tab.id;
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ['dist/foreground.js'],
        });
        chrome.scripting.insertCSS({
            target: { tabId: tabId },
            files: ['dist/style.css']
        });
        chrome.storage.local.clear();
    }
}));
chrome.tabs.onActivated.addListener(() => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const tab = yield getCurrentTab();
    const url = (_b = tab.url) !== null && _b !== void 0 ? _b : '';
    if (/https:\/\/www\.wykop\.pl\/wpis.*/.test(url)) {
        const tabId = tab.id;
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ['dist/foreground.js'],
        });
        chrome.scripting.insertCSS({
            target: { tabId: tabId },
            files: ['dist/style.css']
        });
        chrome.storage.local.clear();
    }
}));
const getCurrentTab = () => __awaiter(void 0, void 0, void 0, function* () {
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = yield chrome.tabs.query(queryOptions);
    return tab;
});
