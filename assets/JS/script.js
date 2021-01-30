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

const settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://bing-news-search1.p.rapidapi.com/news/search?q=senator&freshness=Day&textFormat=Raw&safeSearch=Off",
	"method": "GET",
	"headers": {
		"x-bingapis-sdk": "true",
		"x-rapidapi-key": "93b581f319mshef18294199bf478p1b8c69jsndb7ade1dbb94",
		"x-rapidapi-host": "bing-news-search1.p.rapidapi.com"
	}
};

$.ajax(settings).done(function (response) {
	console.log(response);
});