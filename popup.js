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
	var t = chrome.runtime.getURL("icons/eye_open.png");;

	var members = document.querySelectorAll(".im-member-item.clear_fix .im-member-item--name");

	var member, eye;

	for(var i = 1; i< members.length; i++){
		eye = document.createElement("div");
		eye.className = "_htm_eyeButtonOpen";

		member = members[i];

		member.appendChild(eye);
	}
}




var groupeButton = document.querySelector(".im-page--aside-photo .nim-peer");

groupeButton.addEventListener("click",(()=>{
		var reflection = ()=>{
			var target = document.querySelector(".box_body");
			if(target == null){
				setTimeout(reflection,100);
				return;

			}

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
			//observer.disconnect();
		}
		return reflection;
		}) ()
	);
	 
	




addStyleSeet(['77647179',11504926]);

