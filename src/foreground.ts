const userMentions = document.querySelectorAll("ul.sub div.text a.showProfileSummary");

interface Comments {
    [key: string]: (string | undefined)[],
}

userMentions.forEach(async (mention) => {
    mention.addEventListener('mouseover', async () => {
        const username = mention.textContent!;
        const commentsByUser = await findCommentsByUser(username!);
        const summary = findSummaryPanelByUsername(username!)!;

        commentsByUser[username].forEach((comment) => {
            addCommentToSummary(summary, comment);
        })
    })
})

const findCommentsByUser = async (username: string): Promise<Comments> => {

    const storageComments = await chrome.storage.local.get([username]);

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
    });

    chrome.storage.local.set({
        [username]: comments ?? Array.from([])
    }, () => console.log(`Saved ${JSON.stringify({ [username]: comments ?? Array.from([]) })}`));

    return {
        [username]: comments
    }
}

const findSummaryPanelByUsername = (username: string) => {
    const summary = document.querySelector(`div.summary[data-login=${username}]`);
    if (!summary?.querySelector('div.comments')) {
        addCommentContainerToSummary(summary!);
    }
    return summary;
}

const addCommentContainerToSummary = (summary: Element) => {
    const commentContainer = document.createElement('div')
    commentContainer.className = 'comments'
    summary.appendChild(commentContainer);
}

const addCommentToSummary = (summary: Element, comment: string | undefined) => {
    const row = document.createElement('p');
    row.className = 'comment';
    const textContainer = document.createTextNode(`${comment ?? ''}\n`);
    row.appendChild(textContainer);

    summary.querySelector('div.comments')?.appendChild(row);
}