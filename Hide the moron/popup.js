debugger;

function addStyleSeet(identificates){
	var ids = identificates;
	if(!Array.isArray(ids)){
		ids = [ids]
	}
	var css = `div[data-peer*='` + ids.join(`']{display: none !important;}div[data-peer*='`) + `']{display: none !important;}`
	//var css = `div[data-peer*='` + id + `']{display: none !important;}`,
    head = document.head || document.getElementsByTagName('head')[0],
    style = document.createElement('style');

    style.id = "HideTheMoron";

	style.type = 'text/css';
	if (style.styleSheet){
	  style.styleSheet.cssText = css;
	} else {
	  style.appendChild(document.createTextNode(css));
	}

	head.appendChild(style);
}

function addEyes(){

	var members = document.querySelectorAll(".im-member-item.clear_fix");

	var member;

	for(var i = 1; i< members.length; i++){
		member = 5;
	}
}




var groupeButton = document.querySelector(".im-page--aside-photo .nim-peer");

groupeButton.addEventListener("click",()=>{
	var target = document.querySelector(".box_body");

	var observer = new MutationObserver(function(mutations) {
	  mutations.forEach(function(mutation) {
	  	console.log("mutation triggered")
	    addEyes();
	  });    
	});
	 
	// configuration of the observer:
	var config = {  childList: true, characterData: true };
	 
	// pass in the target node, as well as the observer options
	observer.observe(target, config);
	 
	// later, you can stop observing
	observer.disconnect();
});



addStyleSeet(['77647179',11504926]);

