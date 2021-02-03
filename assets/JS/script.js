function loadClient() {
    gapi.client.setApiKey("AIzaSyDP33wEIM1qwv7C_7NOQlaWEoaEHVOKFUg");
    return gapi.client.load("https://civicinfo.googleapis.com/$discovery/rest?version=v2")
        .then(function () { console.log("GAPI client loaded for API"); },
            function (err) { console.error("Error loading GAPI client for API", err); });
}
gapi.load("client", loadClient);

let userState = "";
$("#submit-state").on("click", function (event) {
    event.preventDefault();
    userState = $("#state-input").val();
    localStorage.setItem("State", userState);
    $(".names").empty();
    $(".newsInfo").empty();
    execute(userState);
});

function execute() {
    return gapi.client.civicinfo.representatives.representativeInfoByAddress({
        "address": userState
    })
        .then(function (response) {
            for (var i = 2; i < response.result.officials.length; i++) {
                let repName = response.result.officials[i].name;
                var li = $("<li>");
                li.addClass("names");
                li.attr("data-rep", repName);
                li.text(repName);
                $(".reps").append(li);
            };
            $(".names").on("click", function () {
                $(".display-news").empty();
                let currentRep = $(this).attr("data-rep")
                const settings = {
                    "async": true,
                    "crossDomain": true,
                    "url": "https://bing-news-search1.p.rapidapi.com/news/search?q="
                        + currentRep +
                        "&freshness=Day&textFormat=Raw&safeSearch=Off",
                    "method": "GET",
                    "headers": {
                        "x-bingapis-sdk": "true",
                        "x-rapidapi-key": "93b581f319mshef18294199bf478p1b8c69jsndb7ade1dbb94",
                        "x-rapidapi-host": "bing-news-search1.p.rapidapi.com"
                    }
                };
                $.ajax(settings).done(function (response) {
                    if (response.value.length <= 0) {
                        alert("no articles");
                    }
                    for (var j = 0; j < response.value.length; j++) {
                        var newP = $("<p>");
                        newP.addClass("newsInfo");
                        if (response.value[j] && response.value[j].image) {
                            var newImg = $("<img>");
                            newImg.attr("src", response.value[j].image.thumbnail.contentUrl);
                            newP.append(response.value[j].name);
                            newP.append(newImg);
                            newP.append(response.value[j].description);
                            newP.append(response.value[j].url);
                        } else if (response.value[j]) {
                            newP.append(response.value[j].name);
                            newP.append(response.value[j].description);
                            newP.append(response.value[j].url);
                        } 
                        $(".display-news").append(newP);
                    };
                });
            });
        },
            function (err) { console.error("Execute error", err); });
};