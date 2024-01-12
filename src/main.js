const { generateHeader, insertHeader } = require("./utils/header-utils");
const wikis = require('./utils/wikis');
const findCurrentWiki = (wikis) => {
	const currentURL = window.location.hostname;
	return wikis.find(wiki => wiki.oldUrl.includes(currentURL));
}


const main = () => {
	if (!window.location.href.includes('fandom.com')) {
		return;
	}

	if (localStorage.getItem('noFandom-disabled') === '1') {
		return;
	}

	const currentWiki = findCurrentWiki(wikis);
	if (!currentWiki) {
		return;
	}

	const header = generateHeader(currentWiki);
	insertHeader(header);
}

main();
