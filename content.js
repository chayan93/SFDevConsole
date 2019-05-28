//Listens to the message sent by background.js, checks the url and then sends back the developer console url to background.js
//this is because, background.js can't get to the current page url and content.js can't open a new tab
//therefore had to play a message passing game between the two js.
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        debugger;
        if( request.message === "clicked_browser_action" ) {
            var url = decodeURIComponent(window.location.host);
            if(url.indexOf('force.com') >= 0){
                var devConsoleURL = 'https://' + url + '/_ui/common/apex/debug/ApexCSIPage';
                console.log(devConsoleURL);

                // This line is new!
                chrome.runtime.sendMessage({"message": "open_new_tab", "url": devConsoleURL});
            }
        }
    }
);