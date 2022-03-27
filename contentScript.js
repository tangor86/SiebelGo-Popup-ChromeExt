function hideIt(mySelector) {
	var x = document.querySelector(mySelector);
	x.style.display = "none";
}

console.log( "JavaScript Injected! content script 2.3!" ); 

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
<div class="GHE_SiebelGo">
    <span class="helper"></span>
    <div>
        <div class="popupCloseButton">&times;</div>
        <p>Add any HTML content<br />inside the popup box!</p>
    </div>
</div>
*/

let linksObj = [
	{name: 'Hello!', viewName: 'disp+rules'},
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
/*
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
*/

//https://stackoverflow.com/questions/15873904/adding-complex-html-using-a-chrome-content-script
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var div = document.createElement('div');
        div.innerHTML = this.responseText;
        document.body.insertBefore(div, document.body.firstChild);
    } else {
        console.log('files not found');
    }
};
xhttp.open("GET", chrome.runtime.getURL("/popup.html"), false);	//true for asyn
xhttp.send();


//gce_divMain.addEventListener('click', () => {
document.querySelector('#GHE_SiebelGo').addEventListener('click', () => {
	hideIt('#GHE_SiebelGo');
	console.log("Hide on GHE_SiebelGo");
});

//gce_divCloseButton.addEventListener('click', () => {
document.querySelector('#GHE_SiebelGo .popupCloseButton').addEventListener('click', () => {
    hideIt('#GHE_SiebelGo');
	console.log("Hide on GHE_SiebelGo .popupCloseButton");
});

//to avoid closing popup on click inside popup
document.querySelector('#GHE_SiebelGo .popup').addEventListener('click', event => {
	event.stopPropagation();
});

//simple links!
const myLinks = document.querySelectorAll('#GHE_SiebelGo .link');
myLinks.forEach(el => el.addEventListener('click', event => {
	window.location.href = event.target.getAttribute("url");
	console.log(event.target.getAttribute("url"));
	event.stopPropagation();
}));


//tab links
const tabLinks = document.querySelectorAll('#GHE_SiebelGo .linkTab');
tabLinks.forEach(el => el.addEventListener('click', event => {
	var link = document.createElementNS("http://www.w3.org/1999/xhtml", "a");
    link.href = event.target.getAttribute("url");
	//'http://www.google.com';
    link.target = '_blank';
    var event2 = new MouseEvent('click', {
        'view': window,
        'bubbles': false,
        'cancelable': true
    });
    link.dispatchEvent(event2);

	console.log(event.target.getAttribute("url"));
	//event.stopPropagation();
}));