const userMentions = document.querySelectorAll("ul.sub div.text a.showProfileSummary");

userMentions.forEach(async (mention) => {
    mention.addEventListener('mouseover', async () => {
        const username = mention.textContent;
        const commentsByUser = await findCommentsByUser(username!);
        const summary = findSummaryPanelByUsername(username!);

        for (const comment in commentsByUser) {
            const commentRow = document.createTextNode(`${comment ?? ''}\n`);
            summary?.appendChild(commentRow);
        }
    })
})


const findCommentsByUser = async (username: string) => {

    const storageComments = await chrome.storage.local.get(username);

    console.log(storageComments);

    if (Object.keys(storageComments).length != 0) {
        console.log('Inside if statement');
        return storageComments;
    }

    const containers = document.querySelectorAll('ul#itemsStream div.wblock.lcontrast.dC  ');
    const comments = Array.from(containers).filter((container) => {
        const author = container.querySelector('div.author.ellipsis  > a > b');
        return author?.innerHTML == username
    }).map((comment) => {
        const commentContainer = comment.querySelector('div.text > p');
        return commentContainer?.textContent?.trim();
    })

    chrome.storage.local.set({ username: comments }, () => console.log(`Saved ${username} to local storage!`));

    console.log(comments);
    

    return comments;
}

const findSummaryPanelByUsername = (username: string) => {
    return document.querySelector(`div.summary[data-login=${username}]`);
}