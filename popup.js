var resultMoron = {};

function getCookie(name) {
  var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(name, value, options) {
  options = options || {};

  var expires = options.expires;

  if (typeof expires == "number" && expires) {
    var d = new Date();
    d.setTime(d.getTime() + expires * 1000);
    expires = options.expires = d;
  }
  if (expires && expires.toUTCString) {
    options.expires = expires.toUTCString();
  }

  value = encodeURIComponent(value);

  var updatedCookie = name + "=" + value;

  for (var propName in options) {
    updatedCookie += "; " + propName;
    var propValue = options[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }

  document.cookie = updatedCookie;
}

function addStyleSeet(identificates){
	var ids = identificates;
	if(!Array.isArray(ids)){
		ids = [ids]
	}
	var css = `div[data-peer*='` + ids.join(`']{display: none !important;}div[data-peer*='`) + `']{display: none !important;}`
	//var css = `div[data-peer*='` + id + `']{display: none !important;}`,
    head = document.head || document.getElementsByTagName('head')[0],
    style = document.getElementById("HideTheMoron") || document.createElement('style');

    style.id = "HideTheMoron";

	style.type = 'text/css';
	if (style.styleSheet){
	  style.styleSheet.cssText = style.cssText + css;
	} else {
	  style.appendChild(document.createTextNode(css));
	}

	head.appendChild(style);
}

function clearStyleSheet(){
	var style = document.getElementById("HideTheMoron");

	if(style ){
		style.innerHTML = "";
	}
}

function addEyes(){
	var t = chrome.runtime.getURL("icons/eye_open.png");;

	var members = document.querySelectorAll(".im-member-item.clear_fix .im-member-item--name");
	var ids =[];

	var ids_nodes = document.querySelectorAll(".im-members--wrap._im_chat_members .im-member-item .im-member-item--kick");

	ids_nodes.forEach((el,index)=>{
		ids[index] = el.className.split("_").slice(-1)[0];
	});

	var member, eye;

	var cook = getCookie("HideTheMoron");

	var data = cook&&JSON.parse(cook) || {};

	var params = window.location.search.split("&");

		var chatNum = params.find((element, index, array)=>{
			if(!(element.indexOf("sel") == 1)){
				return false;
			}
			else{
				return true;
			}
		}).split("=")[1];

	for(var i = 1; i< members.length; i++){
		eye = document.createElement("div");
		var hasRoom = data[chatNum];
		var hasPerson = !(!!hasRoom && (hasRoom.indexOf(ids[i]) > -1 ));
		eye.className = hasRoom ? !hasPerson ? "_htm_eyeButtonClose" : "_htm_eyeButtonOpen" :  "_htm_eyeButtonOpen";

		eye.addEventListener("click",((e)=>{
			var state = hasPerson;//open
			var id = ids[i];
			return ()=>{
				if(state){
					data[chatNum] ? data[chatNum].push(id) : data[chatNum] = [id];
					addStyleSeet(id);
					state = false;
					e.className = "_htm_eyeButtonClose" ;
				}
				else{
					clearStyleSheet();
					data[chatNum].splice(data[chatNum].indexOf(id),1);
					state = true;
					e.className = "_htm_eyeButtonOpen" ;
					addStyleSeet(data[chatNum]);
				}
				setCookie("HideTheMoron", JSON.stringify(data));
			}
		})(eye))

		member = members[i];

		member.appendChild(eye);
	}
}

function firstSteps(){
	var params = window.location.search.split("&");

	var chatNum = params.find((element, index, array)=>{
		if(!(element.indexOf("sel") == 1)){
			return false;
		}
		else{
			return true;
		}
	}).split("=")[1];


	var cook = getCookie("HideTheMoron");

	var data = cook && JSON.parse(cook) || {};

	if(Object.keys(data).length){
		addStyleSeet(data[chatNum]);
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

}

function init(){
	// addStyleSeet(['77647179',11504926]);	
	// console.log(window.location.href);
	// chrome.tabs.onUpdated.addListener(
	//   function(tabId, changeInfo, tab) {
	//     window.console.log('updated from contentscript');
	//   }
	// );

	var location = window.location.href;

	if(location.indexOf("sel=c") > -1){
		firstSteps();
	}
	
	var port = chrome.runtime.connect({name: "HideTheMoron"});

	//port.postMessage({joke: "Knock knock"});

	port.onMessage.addListener(function(msg) {
		console.log(msg);
		firstSteps();
	});


	// chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
	  

	
	// });
}



init();



	 
	






