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
    execute(userState);
});

function execute() {
    return gapi.client.civicinfo.representatives.representativeInfoByAddress({
        "address": userState
    })
        .then(function (response) {
            for (var i = 2; i < 9; i++) {
                let repName = response.result.officials[i].name;
                var li = $("<li>");
                li.addClass("names");
                li.attr("data-rep", repName);
                li.text(repName);
                $(".reps").append(li);
                //cleared when new state selected
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
                    //returns 10 articles at a time
                    //cleared when new name selected 
                    console.log(response);
                    for (var j = 0; j < 11; j++) {
                        var newP = $("<p>");
                        ;
                        //set to image thumbnail URL
                        if (response.value[j] && response.value[j].image) {
                            var newImg = $("<img>)");
                            newImg.attr("src", response.value[j].image.thumbnail.contentUrl);
                            newP.append(response.value[j].name);
                            newP.append(newImg);
                            newP.append(response.value[j].description);
                            newP.append(response.value[j].url);
                        } else if (response.value[j]){
                            newP.append(response.value[j].name);
                            newP.append(response.value[j].description);
                            // newP.append(newImg);
                            newP.append(response.value[j].url);
                        }

                        // newP.text(
                        //     response.value[j].name +
                        //     // if value is undefined, ...
                        //     response.value[j].description +
                        //     // if value is undefined, ...
                        //     response.value[j].image.thumbnail.contentUrl +
                        //     // if value is undefined, ...
                        //     response.value[j].url                        // if value is undefined, ...
                        // );
                        $(".display-news").append(newP);
                        //clear when new name clicked 
                    };
                });
            });
        },
            function (err) { console.error("Execute error", err); });
};

function pageLoad() {
    // upon page load user is presented with search, dropdown etc to choose what rep names get displayed, page transitions to list of rep names
};

function stateRepsSelected() {
    //list gets populated with rep names for user to choose from
    //user can select another state from any page and representatives and news get cleared and repopulated 
};

function repSelectedNews() {
    //news gets populated and cleared relative to name selected
};