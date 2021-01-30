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

function execute() {
    return gapi.client.civicinfo.representatives.representativeInfoByAddress({
    "address": userState
    })
        .then(function(response) {
            console.log("Response", response);
            for (var i = 2; i < 9; i++ ) {
                var repName = response.result.officials[i].name
                var li = $("<li>");
                li.addClass("names")
                li.attr("data-rep", repName)
                li.text(repName);
                $(".reps").append(li);
                console.log(response.result.officials[i].name)
            }
            $(".names").on("click", function(){
                console.log($(this).attr("data-rep"));
            }) 
            },
            function(err) { console.error("Execute error", err); });
}
// Save representative name returned from gcapi into var to pass through news API to return articles
// Function to populate news page portion relative to name clicked
function showNews(candidateName){
    console.log(candidateName);
    $("display-news").text();
}
//https://newsapi.org/docs/get-started#search
var url = 'https://newsapi.org/v2/everything?' + 
//everything endpoint is all atricles
          'q=Apple&' + // Articles published that mention apple
          // candidateName will go in place of apple 
          'from=2021-01-26&' + //Article Date
          'sortBy=popularity&' + //Sort by Popularity 
            'apiKey=6ccab1e31b024c9da887740634bbcad5';
var req = new Request(url);  
// Loop, but need to reference .name not index number
fetch(req)
    .then(response => response.json())
    .then(data => console.log(data));
    fetch(req)
    .then(response => response.json())
    .then(data => console.log(data.articles[0].content));
    fetch(req)
    .then(response => response.json())
    .then(data => console.log(data.articles[0].description));
    fetch(req)
    .then(response => response.json())
    .then(data => console.log(data.articles[0].title));
    fetch(req)
    .then(response => response.json())
    .then(data => console.log(data.articles[0].url));
    fetch(req)
    .then(response => response.json())
    .then(data => console.log(data.articles[0].urlToImage));