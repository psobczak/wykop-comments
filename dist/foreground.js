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
const userMentions = document.querySelectorAll("ul.sub div.text a.showProfileSummary");
userMentions.forEach((mention) => __awaiter(void 0, void 0, void 0, function* () {
    mention.addEventListener('mouseover', () => __awaiter(void 0, void 0, void 0, function* () {
        const username = mention.textContent;
        const commentsByUser = yield findCommentsByUser(username);
        const summary = findSummaryPanelByUsername(username);
        for (const comment in commentsByUser) {
            const commentRow = document.createTextNode(`${comment !== null && comment !== void 0 ? comment : ''}\n`);
            summary === null || summary === void 0 ? void 0 : summary.appendChild(commentRow);
        }
    }));
}));
const findCommentsByUser = (username) => __awaiter(void 0, void 0, void 0, function* () {
    const storageComments = yield chrome.storage.local.get(username);
    console.log(storageComments);
    if (Object.keys(storageComments).length != 0) {
        console.log('Inside if statement');
        return storageComments;
    }
    const containers = document.querySelectorAll('ul#itemsStream div.wblock.lcontrast.dC  ');
    const comments = Array.from(containers).filter((container) => {
        const author = container.querySelector('div.author.ellipsis  > a > b');
        return (author === null || author === void 0 ? void 0 : author.innerHTML) == username;
    }).map((comment) => {
        var _a;
        const commentContainer = comment.querySelector('div.text > p');
        return (_a = commentContainer === null || commentContainer === void 0 ? void 0 : commentContainer.textContent) === null || _a === void 0 ? void 0 : _a.trim();
    });
    chrome.storage.local.set({ username: comments }, () => console.log(`Saved ${username} to local storage!`));
    console.log(comments);
    return comments;
});
const findSummaryPanelByUsername = (username) => {
    return document.querySelector(`div.summary[data-login=${username}]`);
};
