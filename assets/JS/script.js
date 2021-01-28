 // Function to save address to LS and populate representative names on button click
$("#submit-state").on("click", function(event) {
    event.preventDefault();
    let userState = $("#state-input").val();
    console.log(userState);
    localStorage.setItem("State", userState);
// execute(); called in this function to have access to userState
});

function candidateNameList (){
    // Doesn't work, need to draw rep names from google civic API
    for (i=0; i < candidateNameArr.length; i++) {
        var li = $("<li>");
        li.text(candidateName);
        $(".list-group").append(li);
        $(li).on("click", function() {
            showNews(candidateName);
        });
    }
}
//https://newsapi.org/docs/get-started#search

var url = 'http://newsapi.org/v2/everything?' + 
//everything endpoint is all atricles
          'q=Apple&' + // Articles published that mention apple
          // candidateName will go in place of apple 
          'from=2021-01-26&' + //Article Date
          'sortBy=popularity&' + //Sort by Popularity 
            'apiKey=6ccab1e31b024c9da887740634bbcad5';

var req = new Request(url);            
fetch(req)
    .then(response => response.json())
    .then(data => console.log(data.articles[0].content));//display in #display-news
//https://javascript.info/fetch
// How to display additional information using fetch?
// what to display in addition to content 


function loadClient() {
    gapi.client.setApiKey("AIzaSyDP33wEIM1qwv7C_7NOQlaWEoaEHVOKFUg");
    return gapi.client.load("https://civicinfo.googleapis.com/$discovery/rest?version=v2")
        .then(function() { console.log("GAPI client loaded for API"); },
            function(err) { console.error("Error loading GAPI client for API", err); });
}

// Make sure the client is loaded before calling this method.

function execute() {
    return gapi.client.civicinfo.representatives.representativeInfoByAddress({
    "address": userState
    })
        .then(function(response) {
                // Handle the results here (response.result has the parsed body).
                console.log("Response", response);
            },
            function(err) { console.error("Execute error", err); });
}

//ERROR gapi not defined -> resources below

//https://developers.google.com/explorer-help/guides/code_samples#javascript
//https://github.com/google/google-api-javascript-client#loading-an-api-and-making-a-request
//https://github.com/google/google-api-javascript-client/blob/master/docs/samples.md

gapi.load("client", loadClient);
