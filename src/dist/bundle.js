(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{"./utils/header-utils":2,"./utils/wikis":3}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
module.exports = [
	{
		"name":"Transformers Wiki",
		"moveDate":"september 2008",
		"oldUrl":"transformers.fandom.com",
		"newUrl":"http://tfwiki.net"
	},
	{
		"name":"Paragon Wiki",
		"moveDate":"October 2008",
		"oldUrl":"paragon.fandom.com",
		"newUrl":"http://paragonwiki.com"
	},
	{
		"name":"Illogicopedia",
		"moveDate":"November 2008",
		"oldUrl":"https://wackypedia.wikia.com/",
		"newUrl":"http://en.illogicopedia.org"
	},
	{
		"name":"WikiFur",
		"moveDate":"August 2009",
		"oldUrl":"furry.fandom.com",
		"newUrl":"http://wikifur.com"
	},
	{
		"name":"Neukolumbia Wiki (private wiki)",
		"moveDate":"2010",
		"oldUrl":"neukolumbia.wikia.com",
		"newUrl":"http://neukolumbia.shoutwiki.com"
	},
	{
		"name":"Smash Wiki",
		"moveDate":"September 2010",
		"oldUrl":"super-smash-bros.fandom.com",
		"newUrl":"http://www.ssbwiki.com"
	},
	{
		"name":"Pikipedia",
		"moveDate":"September 2010",
		"oldUrl":"pikmin.fandom.com",
		"newUrl":"http://www.pikminwiki.com"
	},
	{
		"name":"Absurdopedia",
		"moveDate":"October 2010",
		"oldUrl":"absurdopedia.fandom.com",
		"newUrl":"http://absurdopedia.net"
	},
	{
		"name":"Halopedia",
		"moveDate":"December 2010",
		"oldUrl":"halo.fandom.com",
		"newUrl":"http://halopedia.org"
	},
	{
		"name":"Club Penguin Wiki",
		"moveDate":"October 2010",
		"oldUrl":"clubpenguin.fandom.com",
		"newUrl":"http://clubpenguinwiki.info"
	},
	{
		"name":"Nookipedia",
		"moveDate":"October 2010",
		"oldUrl":"animalcrossing.fandom.com",
		"newUrl":"http://nookipedia.com"
	},
	{
		"name":"Grand Theft Wiki",
		"moveDate":"October 2010",
		"oldUrl":"gta.fandom.com",
		"newUrl":"http://www.grandtheftwiki.com"
	},
	{
		"name":"Dragon Quest Wiki",
		"moveDate":"October 2010",
		"oldUrl":"dragonquest.fandom.com",
		"newUrl":"http://www.dragon-quest.org"
	},
	{
		"name":"Вовпедия",
		"moveDate":"October 2010",
		"oldUrl":"ru.wow.fandom.com",
		"newUrl":"http://www.wowpedia.ru"
	},
	{
		"name":"Donkey Kong Wiki",
		"moveDate":"October 2010",
		"oldUrl":"donkeykong.fandom.com",
		"newUrl":"http://www.dkwiki.com"
	},
	{
		"name":"MiningWiki",
		"moveDate":"October 2010",
		"oldUrl":"ru.mining.fandom.com",
		"newUrl":"http://miningwiki.ru"
	},
	{
		"name":"Dungeons and Dragons Wiki",
		"moveDate":"November 2010",
		"oldUrl":"dungeons.fandom.com",
		"newUrl":"http://www.dnd-wiki.org"
	},
	{
		"name":"PathfinderWiki",
		"moveDate":"November 2010",
		"oldUrl":"pathfinder.fandom.com",
		"newUrl":"https://pathfinderwiki.com"
	},
	{
		"name":"NetHackWiki",
		"moveDate":"November 2010",
		"oldUrl":"nethack.fandom.com",
		"newUrl":"http://nethackwiki.com"
	},
	{
		"name":"Wizard101 Central Wiki",
		"moveDate":"November 2010",
		"oldUrl":"wizard101.fandom.com",
		"newUrl":"http://www.wizard101central.com/wiki"
	},
	{
		"name":"MicroWiki",
		"moveDate":"November 2010",
		"oldUrl":"micronations.fandom.com",
		"newUrl":"https://micronations.wiki"
	},
	{
		"name":"Touhou Wiki",
		"moveDate":"November 2010",
		"oldUrl":"touhou.fandom.com",
		"newUrl":"http://en.touhouwiki.net"
	},
	{
		"name":"Golden Sun Universe",
		"moveDate":"November 2010",
		"oldUrl":"goldensun.fandom.com",
		"newUrl":"http://goldensunwiki.net"
	},
	{
		"name":"Hetalia Archives",
		"moveDate":"December 2010",
		"oldUrl":"hetalia.fandom.com",
		"newUrl":"http://hetalia.kitawiki.net"
	},
	{
		"name":"Deadrising Wiki (domain highjacked)",
		"moveDate":"December 2010",
		"oldUrl":"deadrising.fandom.com",
		"newUrl":"http://deadrisingwiki.com"
	},
	{
		"name":"Ferropedia",
		"moveDate":"December 2010",
		"oldUrl":"ferrocarriles.fandom.com",
		"newUrl":"http://www.ferropedia.es"
	},
	{
		"name":"Combine OverWiki",
		"moveDate":"December 2010",
		"oldUrl":"half-life.fandom.com",
		"newUrl":"http://combineoverwiki.net"
	},
	{
		"name":"Kingdom Hearts Wiki",
		"moveDate":"February 2011",
		"oldUrl":"kingdomhearts.fandom.com",
		"newUrl":"http://www.khwiki.com"
	},
	{
		"name":"Final Fantasy XI wiki",
		"moveDate":"April 2011",
		"oldUrl":"wiki.ffxiclopedia.org",
		"newUrl":"http://ffxi.gamerescape.com/wiki"
	},
	{
		"name":"Gineipaedia",
		"moveDate":"April 2011",
		"oldUrl":"yang-wenli.fandom.com",
		"newUrl":"https://gineipaedia.com/wiki/Gineipaedia"
	},
	{
		"name":"Chrono Wiki",
		"moveDate":"August 2011",
		"oldUrl":"chrono.fandom.com",
		"newUrl":"https://www.chronowiki.org"
	},
	{
		"name":"Doom Wiki",
		"moveDate":"September 2011",
		"oldUrl":"doom.fandom.com",
		"newUrl":"http://doomwiki.org"
	},
	{
		"name":"Serial Experiments Lain Wiki",
		"moveDate":"November 2011",
		"oldUrl":"sel.fandom.com",
		"newUrl":"https://lain.wiki/wiki"
	},
	{
		"name":"The SpongeBob Community Wiki",
		"moveDate":"December 2012",
		"oldUrl":"sbcommunity.fandom.com",
		"newUrl":"http://www.thesbcommunity.com/wiki"
	},
	{
		"name":"Uncyclopedia (English)",
		"moveDate":"January 2013",
		"oldUrl":"uncyclopedia.fandom.com",
		"newUrl":"http://en.uncyclopedia.co"
	},
	{
		"name":"Coasterpedia",
		"moveDate":"May 2013",
		"oldUrl":"rollercoaster.fandom.com",
		"newUrl":"http://coasterpedia.net"
	},
	{
		"name":"Barney Bunch Wiki",
		"moveDate":"December 2013",
		"oldUrl":"thenewbarneybunch.fandom.com",
		"newUrl":"http://en.barneybunch.shoutwiki.com"
	},
	{
		"name":"Teleram Wiki",
		"moveDate":"June 2014",
		"oldUrl":"teleram.fandom.com",
		"newUrl":"https://telerammy.shoutwiki.com"
	},
	{
		"name":"Jellopedia",
		"moveDate":"September 2014",
		"oldUrl":"tanman.fandom.com",
		"newUrl":"https://songfics.shoutwiki.com"
	},
	{
		"name":"Creatures Wiki",
		"moveDate":"August 2014",
		"oldUrl":"creatures.fandom.com",
		"newUrl":"http://creatures.wiki"
	},
	{
		"name":"The Lost Media Wiki",
		"moveDate":"June 2016",
		"oldUrl":"lostmedia.fandom.com",
		"newUrl":"http://lostmediawiki.com"
	},
	{
		"name":"Junawiki",
		"moveDate":"September 2015",
		"oldUrl":"fi.junapedia.fandom.com",
		"newUrl":"http://junat.shoutwiki.com"
	},
	{
		"name":"LEGO Batman Wiki",
		"moveDate":"April 2016",
		"oldUrl":"legobatman.fandom.com",
		"newUrl":"http://legobatman.shoutwiki.com"
	},
	{
		"name":"Wikizilla",
		"moveDate":"September 2016",
		"oldUrl":"godzilla.fandom.com",
		"newUrl":"http://wikizilla.org"
	},
	{
		"name":"Oecumene",
		"moveDate":"August 2016",
		"oldUrl":"ru.worlds.fandom.com",
		"newUrl":"https://oecumene.miraheze.org"
	},
	{
		"name":"Green Day Wiki",
		"moveDate":"November 2016",
		"oldUrl":"greenday.fandom.com",
		"newUrl":"http://greenday.shoutwiki.com"
	},
	{
		"name":"Legit Lyrics",
		"moveDate":"December 2016",
		"oldUrl":"legitlyrics.fandom.com",
		"newUrl":"http://legitlyrics.shoutwiki.com"
	},
	{
		"name":"WikiDex",
		"moveDate":"August 2017",
		"oldUrl":"es.pokemon.fandom.com",
		"newUrl":"https://www.wikidex.net"
	},
	{
		"name":"Yugipedia",
		"moveDate":"Janueary 2018",
		"oldUrl":"yugioh.fandom.com",
		"newUrl":"https://yugipedia.com"
	},
	{
		"name":"Equestripedia",
		"moveDate":"December 2017",
		"oldUrl":"equestripedia.fandom.com/wiki",
		"newUrl":"http://mylittlepony.miraheze.org/wiki"
	},
	{
		"name":"Wiki Dragon Quest",
		"moveDate":"June 2016",
		"oldUrl":"fr.dragonquest.fandom.com/wiki",
		"newUrl":"https://wikidragonquest.fr"
	},
	{
		"name":"The Science Archives",
		"moveDate":"July 2018",
		"oldUrl":"everythingyouneedtoknowaboutscience.fandom.com",
		"newUrl":"https://thesciencearchives.miraheze.org"
	},
	{
		"name":"SmashPedia",
		"moveDate":"August 2018",
		"oldUrl":"es.smashbros.fandom.com",
		"newUrl":"https://es.ssbwiki.com"
	},
	{
		"name":"The RuneScape Wiki",
		"moveDate":"October 2018",
		"oldUrl":"runescape.fandom.com",
		"newUrl":"https://runescape.wiki"
	},
	{
		"name":"Old School RuneScape Wiki",
		"moveDate":"October 2018",
		"oldUrl":"oldschoolrunescape.fandom.com",
		"newUrl":"https://oldschool.runescape.wiki"
	},
	{
		"name":"Bakugan Wiki",
		"moveDate":"November 2018",
		"oldUrl":"bakugan.fandom.com",
		"newUrl":"https://bakugan.wiki"
	},
	{
		"name":"Fanonpedia",
		"moveDate":"November 2018",
		"oldUrl":"thefreefanon.fandom.com (oldest)fanonpedia.wikidot.com (less old)",
		"newUrl":"fanonpedia.shoutwiki.com"
	},
	{
		"name":"Anime Bath Scene Wiki",
		"moveDate":"November 2018",
		"oldUrl":"animebaths.fandom.com",
		"newUrl":"https://animebathscenewiki.com"
	},
	{
		"name":"The Kingkiller Chronicle Wiki",
		"moveDate":"December 2018",
		"oldUrl":"kingkiller.fandom.com",
		"newUrl":"https://kingkiller.wiki"
	},
	{
		"name":"Jiggywikki",
		"moveDate":"December 2018",
		"oldUrl":"banjokazooie.fandom.com",
		"newUrl":"https://banjokazooiewiki.com"
	},
	{
		"name":"When Objects Works Wiki",
		"moveDate":"February 2019",
		"oldUrl":"jordanb.fandom.com",
		"newUrl":"https://whenobjectsworks.miraheze.org/wiki"
	},
	{
		"name":"Rare Wiki",
		"moveDate":"February 2019",
		"oldUrl":"rare.fandom.com",
		"newUrl":"https://rarewiki.com"
	},
	{
		"name":"Diary of a Wimpy Wiki",
		"moveDate":"June 2018",
		"oldUrl":"diary-of-a-wimpy-kid.fandom.com",
		"newUrl":"https://wimpykidwiki.com"
	},
	{
		"name":"Blue Bomber Graphic Wiki",
		"moveDate":"July 2019",
		"oldUrl":"archie-mega-man.fandom.com",
		"newUrl":"https://archiemegaman.miraheze.org"
	},
	{
		"name":"Danny Phantom(+Robert L. Forward's Cheela series) Wiki",
		"moveDate":"July 2019",
		"oldUrl":"dannyphantom.fandom.com",
		"newUrl":"https://danny.miraheze.org"
	},
	{
		"name":"JoJo's Bizarre Encyclopedia",
		"moveDate":"November 2019",
		"oldUrl":"jojo.fandom.com",
		"newUrl":"https://jojowiki.com"
	},
	{
		"name":"Arthur Wiki",
		"moveDate":"February 2020",
		"oldUrl":"arthur.fandom.com",
		"newUrl":"https://arthurwiki.com"
	},
	{
		"name":"Graal Military Community Wiki",
		"moveDate":"January 2020",
		"oldUrl":"graalmilitary.fandom.com",
		"newUrl":"https://wiki.graalmilitary.com"
	},
	{
		"name":"Excellent Trains Wiki",
		"moveDate":"October 2020",
		"oldUrl":"excellent-trains.fandom.com",
		"newUrl":"https://excellenttrains.miraheze.org"
	},
	{
		"name":"Mystery Dungeon Franchise Wiki",
		"moveDate":"November 2020",
		"oldUrl":"mysterydungeon.gamepedia.com",
		"newUrl":"https://mysterydungeonwiki.com"
	},
	{
		"name":"Vampire Huntress Legend Series Wiki",
		"moveDate":"January 2020",
		"oldUrl":"vampirehuntress.fandom.com",
		"newUrl":"https://vampire-huntres.com"
	},
	{
		"name":"Dragalia Lost Wiki",
		"moveDate":"January 2020",
		"oldUrl":"dragalialost.fandom.com",
		"newUrl":"https://dragalialost.wiki"
	},
	{
		"name":"Trollpasta Wiki",
		"moveDate":"February 2020",
		"oldUrl":"trollpasta.fandom.com",
		"newUrl":"https://trollpasta.com"
	},
	{
		"name":"Two Worlds Wiki",
		"moveDate":"February 2021",
		"oldUrl":"twoworlds.fandom.com",
		"newUrl":"https://twoworldswiki.com"
	},
	{
		"name":"Fallen London Wiki",
		"moveDate":"March 2021",
		"oldUrl":"fallenlondon.fandom.com",
		"newUrl":"https://fallenlondon.wiki"
	},
	{
		"name":"RollerCoaster Tycoon Wiki",
		"moveDate":"August 2021",
		"oldUrl":"rct.fandom.com",
		"newUrl":"https://rct.wiki"
	},
	{
		"name":"SaGa Wiki",
		"moveDate":"December 2021",
		"oldUrl":"saga.fandom.com",
		"newUrl":"https://sagawiki.org"
	},
	{
		"name":"Croc Wiki",
		"moveDate":"January 2022",
		"oldUrl":"croc.fandom.com",
		"newUrl":"https://crocwiki.com"
	},
	{
		"name":"MOGAI Wiki (formerly Ezgender Wiki)",
		"moveDate":"January 2022",
		"oldUrl":"ezgender.fandom.com",
		"newUrl":"https://mogai.miraheze.org"
	},
	{
		"name":"Terraria Wiki",
		"moveDate":"March 2022",
		"oldUrl":"terraria.fandom.com",
		"newUrl":"https://terraria.wiki.gg"
	},
	{
		"name":"Fallout Wiki",
		"moveDate":"April 2022",
		"oldUrl":"fallout.fandom.com",
		"newUrl":"https://fallout.wiki"
	},
	{
		"name":"ARK: Survival Evolved Wiki",
		"moveDate":"April 2022",
		"oldUrl":"ark.fandom.com",
		"newUrl":"https://ark.wiki.gg"
	},
	{
		"name":"The Obey Me Wiki",
		"moveDate":"April 2022",
		"oldUrl":"obey-me.fandom.com",
		"newUrl":"https://obeymewiki.com"
	},
	{
		"name":"Houkai Gakuen 2 Wiki",
		"moveDate":"May 2022",
		"oldUrl":"houkai2nd.fandom.com",
		"newUrl":"https://houkai2nd.miraheze.org"
	},
	{
		"name":"Angry Birds Wiki (read only)",
		"moveDate":"June 2022",
		"oldUrl":"angrybirds.fandom.com",
		"newUrl":"https://angrybirds.miraheze.org"
	},
	{
		"name":"Temtem Wiki",
		"moveDate":"June 2022",
		"oldUrl":"temtem.fandom.com",
		"newUrl":"https://temtem.wiki.gg"
	},
	{
		"name":"Noita Wiki",
		"moveDate":"September 2022",
		"oldUrl":"noita.fandom.com",
		"newUrl":"https://noita.wiki.gg"
	},
	{
		"name":"Zeldapedia",
		"moveDate":"October 2022",
		"oldUrl":"zelda.fandom.com",
		"newUrl":"https://zeldawiki.wiki"
	},
	{
		"name":"One Page Rules Wiki",
		"moveDate":"October 2022",
		"oldUrl":"onepagerules.fandom.com",
		"newUrl":"https://wiki.onepagerules.com"
	},
	{
		"name":"Teh Meme Wiki",
		"moveDate":"January 2023",
		"oldUrl":"meme.fandom.com",
		"newUrl":"https://meme.miraheze.org"
	},
	{
		"name":"Yoshi Wiki (forked/merged with Yoshipedia)",
		"moveDate":"February 2023",
		"oldUrl":"yoshi.fandom.com",
		"newUrl":"https://yoshipedia.com"
	},
	{
		"name":"Galaxypedia",
		"moveDate":"November 2021",
		"oldUrl":"roblox-galaxy-official.fandom.com",
		"newUrl":"https://robloxgalaxy.wiki/wiki/Main_Page"
	},
	{
		"name":"Rhythm Heaven Wiki",
		"moveDate":"August 2023",
		"oldUrl":"rhythmheaven.fandom.com",
		"newUrl":"https://rhwiki.net"
	},
	{
		"name":"Acepedia",
		"moveDate":"May 2023",
		"oldUrl":"acecombat.fandom.com",
		"newUrl":"https://acecombat.wiki.gg"
	},
	{
		"name":"Pandora's Tale Wiki",
		"moveDate":"August 2023",
		"oldUrl":"pandorastale.fandom.com",
		"newUrl":"https://pandorastale.wiki"
	},
	{
		"name":"Koei Wiki",
		"moveDate":"September 2023",
		"oldUrl":"koei.fandom.com",
		"newUrl":"https://koeitecmo.wiki"
	},
	{
		"name":"The Minecraft Wiki",
		"moveDate":"September 2023",
		"oldUrl":"minecraft.fandom.com",
		"newUrl":"https://minecraft.wiki"
	},
	{
		"name":"Warcraft Wiki",
		"moveDate":"October 2023",
		"oldUrl":"wowpedia.fandom.com",
		"newUrl":"https://warcraft.wiki.gg"
	},
	{
		"name":"Hollow Knight Wiki",
		"moveDate":"December 2023",
		"oldUrl":"hollowknight.fandom.com",
		"newUrl":"https://hollowknight.wiki"
	},
	{
		"name":"Physical Anthropology Wiki",
		"moveDate":"November 2023",
		"oldUrl":"physicalanthropologywiki.fandom.com",
		"newUrl":"https://physicalanthropology.miraheze.org/wiki"
	}
]

},{}]},{},[1]);