function loadClient() {
    gapi.client.setApiKey("AIzaSyDP33wEIM1qwv7C_7NOQlaWEoaEHVOKFUg");
    return gapi.client.load("https://civicinfo.googleapis.com/$discovery/rest?version=v2")
        .then(function() { console.log("GAPI client loaded for API"); },
            function(err) { console.error("Error loading GAPI client for API", err); });
}
gapi.load("client", loadClient);

// Function to save address to LS and populate representative names on button click
let userState = "";
$("#submit-state").on("click", function(event) {
    event.preventDefault();
    userState = $("#state-input").val();
    localStorage.setItem("State", userState);
    execute(userState);
//candidateNameList();
});

let candidateName = "";
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

// Save representative name returned from gcapi into var to pass through news API to return articles
// Function to populate news page portion relative to name clicked
function showNews(candidateName){
    console.log(candidateName);
    $("display-news").text();
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
    .then(data => console.log(data.articles[0].content));
    fetch(req)
    .then(response => response.json())
    .then(data => console.log(data.articles[1].content));

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