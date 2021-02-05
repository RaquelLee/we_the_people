$(".collection").addClass("hide");
$(".no-news").addClass("hide");

function loadClient() {
    gapi.client.setApiKey("AIzaSyDP33wEIM1qwv7C_7NOQlaWEoaEHVOKFUg");
    return gapi.client.load("https://civicinfo.googleapis.com/$discovery/rest?version=v2")
        .then(function () {
        console.log("GAPI client loaded for API");
    },
    function (err) { 
        console.error("Error loading GAPI client for API", err); 
    });
};
gapi.load("client", loadClient);

let userState = "";
$("#submit-state").on("click", function (event) {
    event.preventDefault();
    userState = $("#state-input").val();
    localStorage.setItem("State", userState);
    execute(userState);
    clearSideBar();
    $(".reps").empty();
});

$("#history-state").on("click", function (event) {
    event.preventDefault();
    userState = localStorage.getItem("State");
    execute(userState);
});

function execute() {
    return gapi.client.civicinfo.representatives.representativeInfoByAddress({
        "address": userState
    })
        .then(function (response) {
            searchPageStyle();

            // Rep name list
            for (var i = 2; i < response.result.officials.length; i++) {
                let repName = response.result.officials[i].name;
                var li = $("<li>");
                li.addClass("names collection-item");
                li.attr("data-rep", repName);
                li.text(repName);
                $(".reps").append(li);
            };

            // Active rep 
            $(".names").on("click", function () {
                $(".collection-item").removeClass("active");
                $(".display-news").empty()
                let currentRep = $(this).attr("data-rep");
                $(this).addClass("active");

                // News API
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
                    $(".no-news").addClass("hide");

                    // Bernie Modal
                    if (response.value.length <= 0) {
                        openModal();
                        $(".title").text("No articles were found for this Rep.");
                        $(".title").attr("style", "margin-left: 10px");
                        $(".close-button").on("click", function () {
                            closeModal();                        
                        });
                        $(document).on("click", function () {
                            closeModal();
                        });
                    };

                    // News Display
                    for (var j = 0; j < response.value.length; j++) {
                        if (response.value[j]) {
                            var colDiv = $("<div>");
                            colDiv.addClass("col s6");
                            $(".display-news").append(colDiv);

                            var cardDiv = $("<div>");
                            cardDiv.addClass("card card-panel hoverable large");
                            $(colDiv).append(cardDiv);

                            if (response.value[j].image) {
                                var newImg = $("<img>");
                                newImg.addClass("circle responsive-img");
                                newImg.attr("src", response.value[j].image.thumbnail.contentUrl);
                                cardDiv.append(newImg);
                            };

                            var newSpan = $("<span>");
                            newSpan.addClass("card-title");
                            if (response.value[j].name.length > 112) {
                                response.value[j].name = response.value[j].name.substring(0, 111) + "...";
                            };
                            newSpan.text(response.value[j].name);
                            cardDiv.append(newSpan);

                            var newA = $("<a>");
                            newA.attr("target","_blank");
                            newA.addClass("btn-floating waves-effect waves-light halfway-fab black");
                            newA.attr("href", response.value[j].url);
                            var i = $("<i>");
                            i.addClass("material-icons");
                            i.text("open_in_new");
                            newA.append(i);
                            cardDiv.prepend(newA);

                            var cardContentDiv = $("<div>");
                            cardContentDiv.addClass("card-content");
                            cardDiv.append(cardContentDiv);

                            var newP = $("<p>");
                            newP.addClass("scroll-box");
                            newP.text(response.value[j].description);
                            cardContentDiv.append(newP);
                        };
                    };
                });
            });
        },
            function (err) {
                // Modal for user input empty/unrecognized
                console.error("Execute error", err);
                clearSideBar();
                $(".display-news").empty();
                openModal();
                $(".title").text("Entry non-recognizable. Check your spelling.");
                $(".close-button").on("click", function () {
                    closeModal();
                });
                $(document).on("click", function () {
                    closeModal();
                });
            });
};

//funcs for repetitive/unnecissarily nested code
function searchPageStyle () {
    $(".no-news").removeClass("hide");
    $(".cursive").removeClass("front-page");
    $(".about").addClass("hide");
    $("#history-state").addClass("hide");
    $(".collection").removeClass("hide");
    $(".display-news").empty();
};

function clearSideBar () {
    $(".collection-item").empty();
    $(".names").empty();
};

function openModal () {
    $(".mod").addClass("open");
    $("#overlay").addClass("open");
};

function closeModal () {
    $(".mod").removeClass("open");
    $("#overlay").removeClass("open");
};