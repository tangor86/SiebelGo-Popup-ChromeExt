function hideIt(mySelector) {
	var x = document.querySelector(mySelector);
	x.style.display = "none";
}

console.log( "JavaScript Injected! content script 2!" ); 

//document.body.innerHTML = 'Content script 2';

/*
let div = document.createElement("div");
let p = document.createElement("p");

//div.prepend("Some text", p);

div.innerHTML = 'Testing div!';
div.className = 'myTest';

document.querySelector('body').prepend(div);
*/

/*
<div class="SiebelGo">
    <span class="helper"></span>
    <div>
        <div class="popupCloseButton">&times;</div>
        <p>Add any HTML content<br />inside the popup box!</p>
    </div>
</div>
*/

let linksObj = [
	{name: 'Dispatch Rules', viewName: 'disp+rules'},
	{name: 'Data Map Editor', viewName: 'dm+editor'},
	{name: 'Workflow Deployment', viewName: 'wf+deployment'}
];
//console.dir(linksObj);

let gce_divMain = document.createElement("div");
let gce_spanHelper = document.createElement("span");
let gce_divContainner = document.createElement("div");
let gce_divCloseButton = document.createElement("div");
let gce_divText = document.createElement("div");
let gce_link;

gce_divMain.classList.add('SiebelGo');
//gce_divMain.classList.add('hover_bkgr_hidden');
gce_spanHelper.classList.add('helper');

gce_divCloseButton.classList.add('popupCloseButton');
gce_divCloseButton.innerHTML = '&times;';

gce_divText.id = 'gce_divText';
gce_divText.innerHTML = '...';

//linksObj.forEach(element => {
//console.log( "linksObj.length: " + linksObj.length);

for (let i = 0; i < linksObj.length; i++) {
	const element = linksObj[i];
	//console.log( "element.name: " + element.name);

	gce_link = document.createElement("div");
	gce_link.className = 'link';
	gce_link.innerHTML = element.name;
	gce_link.setAttribute('toview', element.viewName);
	gce_divText.appendChild(gce_link);
}
//});


gce_divContainner.appendChild(gce_divCloseButton);
gce_divContainner.appendChild(gce_divText);

gce_divMain.appendChild(gce_spanHelper);
gce_divMain.appendChild(gce_divContainner);

document.querySelector('body').prepend(gce_divMain);

gce_divMain.addEventListener('click', () => {
    hideIt('.SiebelGo');
});

gce_divCloseButton.addEventListener('click', () => {
    hideIt('.SiebelGo');
});

const muLinks = document.querySelectorAll('.SiebelGo .link');

muLinks.forEach(el => el.addEventListener('click', event => {
	event.stopPropagation();
	console.log(event.target.getAttribute("toview"));
}));