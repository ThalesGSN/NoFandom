const generateText = (currentWiki) => {
	const {name, newUrl, moveDate} = currentWiki;
	return `
<p style="font-size: 1.2em; max-width: 70vw; margin-left: auto; margin-right: auto; padding: 5px;">
	🚨<b>Important</b>🚨 since <date>${moveDate}</date> <b>${name}</b> has been moved from fandom to another platform: <a href="${newUrl}" rel="noreferrer" style="font-weight: bold; text-decoration: underline;">Click here to redirect</a>.
</p>`;
};

const generateHeader = (currentWiki) => {
	const text = generateText(currentWiki);

	return `
<div id="nofandom-header">
    <div style="height: 75px; display: flex; justify-content: space-around; background-color: white; position: fixed; z-index: 99999; top: 0; width: 100%; padding-left: 1em; padding-right: 1em; border-bottom: 1px solid black;">
        <div id="nofandon-content" style="display: flex; align-items: center; background-color: white; justify-content: space-around; width: 100%;">
            <svg style="width: 50px" fill="#ffc500" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"></path>
            </svg>
            ${text}
            <button id="nofandom-close" style="background: none;color: inherit;border: none;padding: 0;font: inherit;cursor: pointer;outline: inherit;">  
							<svg fill="#000000" width="10px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 460.775 460.775" xml:space="preserve">
								<path d="M285.08,230.397L456.218,59.27c6.076-6.077,6.076-15.911,0-21.986L423.511,4.565c-2.913-2.911-6.866-4.55-10.992-4.55
								\tc-4.127,0-8.08,1.639-10.993,4.55l-171.138,171.14L59.25,4.565c-2.913-2.911-6.866-4.55-10.993-4.55
								\tc-4.126,0-8.08,1.639-10.992,4.55L4.558,37.284c-6.077,6.075-6.077,15.909,0,21.986l171.138,171.128L4.575,401.505
								\tc-6.074,6.077-6.074,15.911,0,21.986l32.709,32.719c2.911,2.911,6.865,4.55,10.992,4.55c4.127,0,8.08-1.639,10.994-4.55
								\tl171.117-171.12l171.118,171.12c2.913,2.911,6.866,4.55,10.993,4.55c4.128,0,8.081-1.639,10.992-4.55l32.709-32.719
								\tc6.074-6.075,6.074-15.909,0-21.986L285.08,230.397z"/>
							</svg>
            </button>
        </div>
    </div>
</div>`;
}

const insertHeader = (header) => {
	const body = document.querySelector('body');
	body.insertAdjacentHTML('afterbegin', header);

	window.document.getElementById('nofandom-close').addEventListener('click', () => {
		const noFandomContent = window.document.getElementById('nofandon-content');
		const noFandomWarning = window.document.getElementById('nofandom-header');
		noFandomContent.innerHTML = `<p>Stop showing for this wiki? <a id="nofandom-close--yes" style="cursor: pointer">Yes</a> <a id="nofandom-close--no" style="cursor: pointer">No</a></p>`
		window.document.getElementById('nofandom-close--yes').addEventListener('click', () => {
			localStorage.setItem('noFandom-disabled', '1')
			noFandomWarning.remove();
		})

		window.document.getElementById('nofandom-close--no').addEventListener('click', () => {
			noFandomWarning.remove();
		})

	})
}

module.exports = {
	generateHeader,
	insertHeader
}
