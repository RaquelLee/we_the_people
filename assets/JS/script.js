$(".collection").addClass("hide");//

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
    $(".cursive").removeClass("front-page");
    $(".collection").removeClass("hide");
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
                li.addClass("names");//adding collection-item for active links causes error
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
                            var colDiv = $("<div>");
                            colDiv.addClass("col s6 ")
                            $(".display-news").append(colDiv);

                            var cardDiv = $("<div>");
                            cardDiv.addClass("card card-panel hoverable large");
                            $(colDiv).append(cardDiv);

                            var newImg = $("<img>");
                            newImg.addClass("circle responsive-img imgBtn");

                            newImg.attr("src", response.value[j].image.thumbnail.contentUrl);
                            cardDiv.append(newImg);

                            var newSpan = $("<span>");
                            newSpan.addClass("card-title");
                            if (response.value[j].name.length > 112){
                                response.value[j].name = response.value[j].name.substring(0, 111) + "...";
                            };
                            newSpan.text(response.value[j].name);
                            cardDiv.append(newSpan); 

                            var newA = $("<a>"); 
                            newA.addClass("btn-floating waves-effect waves-light halfway-fab grey");
                            newA.attr("href", response.value[j].url);
                            var i = $("<i>");
                            i.addClass("material-icons tiny");
                            i.text("open_in_new");
                            newA.append(i);
                            cardDiv.prepend(newA);

                            var cardContentDiv = $("<div>");
                            cardContentDiv.addClass("card-content scroll-box");
                            cardDiv.append(cardContentDiv);

                            var newP = $("<p>");
                            newP.addClass("newsInfo scroll-box");
                            newP.text(response.value[j].description);
                            cardContentDiv.append(newP); 
                        };
                        // SHOW ARTICLES WITH NO IMAGE?
                        // } else if (response.value[j]) {
                        //     var colDiv = $("<div>");
                        //     colDiv.addClass("col s6 ")
                        //     $(".display-news").append(colDiv);

                        //     var cardDiv = $("<div>");
                        //     cardDiv.addClass("card card-panel hoverable large");
                        //     $(colDiv).append(cardDiv);

                        //     var newSpan = $("<span>");
                        //     newSpan.addClass("card-title");
                        //     if (response.value[j].name.length > 112){
                        //         response.value[j].name = response.value[j].name.substring(0, 111) + "...";
                        //     };
                        //     newSpan.text(response.value[j].name);
                        //     cardDiv.append(newSpan); 

                        //     var newA = $("<a>"); 
                        //     newA.addClass("btn-floating waves-effect waves-light halfway-fab grey");
                        //     newA.attr("href", response.value[j].url);
                        //     var i = $("<i>");
                        //     i.addClass("material-icons tiny");
                        //     i.text("open_in_new");
                        //     newA.append(i);
                        //     cardDiv.prepend(newA);

                        //     var cardContentDiv = $("<div>");
                        //     cardContentDiv.addClass("card-content scroll-box");
                        //     cardDiv.append(cardContentDiv);

                        //     var newP = $("<p>");
                        //     newP.addClass("newsInfo scroll-box");
                        //     newP.text(response.value[j].description);
                        //     cardContentDiv.append(newP);
                        // };
                    }});
            });
        },
            function (err) { console.error("Execute error", err); });
};