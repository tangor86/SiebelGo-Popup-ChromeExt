function onTabUrlUpdated(tabId) {
  return new Promise((resolve, reject) => {
    const onUpdated = (id, info) => id === tabId && info.url && done(true);
    const onRemoved = id => id === tabId && done(false);
    chrome.tabs.onUpdated.addListener(onUpdated);
    chrome.tabs.onRemoved.addListener(onRemoved);
    function done(ok) {
      chrome.tabs.onUpdated.removeListener(onUpdated);
      chrome.tabs.onRemoved.removeListener(onRemoved);
      (ok ? resolve : reject)();
    }
  });
}


async function getClipboardContents() {
	try {
		const text = await navigator.clipboard.readText();
		console.log('Copied content: ', text);
	} catch (err) {
		console.error('Failed to read clipboard contents: ', err);
	}
}


function contentScriptFunc(name) {
	//alert(`"${name}" executed`);
	//$('.SiebelGo').show();
	var searchFor = 'view=';
	var winLoc = window.location.href;
	var foundAt = winLoc.indexOf(searchFor);
	var x = document.querySelector(".SiebelGo");
	x.style.display = "block";

	//getClipboardContents();

	//this is working!!
	/*
	navigator.clipboard.readText().then(
		//clipText => document.body.innerText = clipText
		clipText => document.getElementById('gce_divText').innerHTML = 'In clipboard: ' + clipText
	);
	*/
	
	console.log('location: ' + winLoc);
	console.log('foundAt: ' + foundAt);
	
	/*
	if (foundAt > 0) {
		window.location.href = winLoc.substr(0, foundAt+searchFor.length) + 'qwerty123';
	}
	*/

	/*
	if (x.style.display === "none") {
	  x.style.display = "block";
	} else {
	  x.style.display = "none";
	}
	*/
}

// background.js
chrome.action.onClicked.addListener((tab) => {
	chrome.scripting.executeScript({
		target: {tabId: tab.id},
		function: contentScriptFunc,
		args: ['action'],
	});
});
