function getDifference(a, b)
{
    var i = 0;
    var j = 0;
    var result = "";

    while (j < b.length)
    {
        if (a[i] != b[j] || i == a.length)
            result += b[j];
        else
            i++;
        j++;
    }
    return result;
}

///////////////////


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
   

 //    var origin_url = sender.tab.url;
 //    var origin_id = sender.tab.id;

 //    chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
 //    	if(origin_id !== tabId) {
 //    		return;
 //    	}
	//   	chrome.tabs.get(tabId, function(tab) {
	//         var diff = getDifference(origin_url, tab.url);

	//         if(diff.indexOf("sel") > -1){
	//         	sendResponse({farewell: "it is the time to start"});
	//         }

	// 	});
	// });


});


chrome.runtime.onConnect.addListener(function(port) {
	console.log("listener " + (new Date()));
	console.assert(port.name == "HideTheMoron");
	var origin_url = port.sender.tab.url;
    var origin_id = port.sender.tab.id;

    port.onMessage.addListener(function(msg) {
    	console.log(msg);
  	});

    chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    		console.log("tab listener " + (new Date()));
    	if(origin_id !== tabId || changeInfo.status != "complete") {
    		return;
    	}
	  	chrome.tabs.get(tabId, function(tab) {
	  			console.log("tabId listener " + (new Date()));
	        //var diff = getDifference(origin_url, tab.url);

	        if(tab.url.indexOf("sel=c") > -1){
	        	var date = new Date();
	        	var msg = "it is the time to start" + date;
	        	console.log(msg);
	        	port.postMessage({question: msg});
	        }

		});
	});






  // console.assert(port.name == "HideTheMoron");
  // port.onMessage.addListener(function(msg) {
  //   if (msg.joke == "Knock knock")
  //     port.postMessage({question: "Who's there?"});
  //   else if (msg.answer == "Madame")
  //     port.postMessage({question: "Madame who?"});
  //   else if (msg.answer == "Madame... Bovary")
  //     port.postMessage({question: "I don't get it."});
  // });
});
