$(document).ready(function() {

    //Categories data  identifier: 
    //Animals = 1 
    //Arts, Culture, Humanities = 2 
    //Education = 3 
    //Environment = 4
    //Health = 5 
    //Human Services = 6
    //Human and Civil Rights = 8
    //Religion = 9
    //Research and Public Policy = 11

    var categoryImages = ["Animals1.jpg","ArtsCultureHumanities2.jpg","Education3.jpg","Environment4.jpg","Health5.jpg","HumanServices6.jpg","HumanCivilRights8.jpg","Religion9.jpg","ResearchPublicPolicy11"];

       var city = "raleigh";

       var state = "NC";

       var zip = "27613";
    
       var categoryIdentifier = $(".category").data("category-id");
    
       var queryURL = "https://api.data.charitynavigator.org/v2/Organizations?&app_id=d555fab3&app_key=21adfc6c878ba1839bb8e6a8e0838951&pageSize=8&rated=true&city=" + city + "&state=" + state; 

    
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(getData);
    
        function getData(data) {
            console.log(data);
            console.log(data[0].charityName);
            console.log(data[0].mission);
            console.log("Rating: " + data[0].currentRating.rating);
            console.log(data[0].websiteURL);
            console.log(data[0].irsClassification.subsection);


            //Loop Through Data Returned 

            for (var i = 0; i <data.length; i++) {
                //most-outer Div
                var $npDiv = $('<div class="col s6 m4 cardcol for-buttons"></div>');

                //Card Div
                var $mycard = $('<div class="card small sticky-action"></div>');

                var $cardContent = $('<div class="card-image waves-effect waves-block waves-light"><img class="activator" src="images/'+categoryImages[i] +'"></div>');

                var $cardContentAction = $('<div class="card-action" style="height:40%;padding: 5px 18px;">');
                
                var $cardContentSpan=$('<p class="card-title activator grey-text text-darken-4"></span>');
                $cardContentSpan.text(data[i].charityName);

                var $icon = $("<i>");
                $icon.addClass("material-icons right");
                $icon.text("more_vert");

                $cardContentSpan.append($icon);

                var $cardContentP = $("<p>");
                var $cardContentLink = $('<a href="results.html" target="blank" style="color:fuchsia">');
                $cardContentLink.text("Contribute");
                $cardContentP.append($cardContentLink);
                $cardContentAction.append($cardContentSpan).append($cardContentP);

                //Card Reveal Creation
                var $cardReveal = $("<div>");
                $cardReveal.addClass("card-reveal");

                var $cardRevealSpan = $("<p>");
                $cardRevealSpan.addClass("card-title grey-text text-darken-4");
                $cardContentSpan.css({"font-size":"20px","line-height":"1.4rem" });
                $cardRevealSpan.append(data[i].charityName);

                var $cardRevealIcon = $("<i>");
                $cardRevealIcon.addClass("material-icons right");
                $cardRevealIcon.css({"margin-left":"0","line-height":"1.25" });
                $cardRevealIcon.text("close");

                $cardRevealSpan.append($cardRevealIcon);

                var $cardRevealP = $("<p>");
                $cardRevealP.text("data[i].mission");

                $cardReveal.append($cardRevealSpan).append($cardRevealP);

                // Appending CardImg, CardContent, and Card Reveal to its div
                $mycard.append($cardContent);
                $mycard.append($cardContentAction);
                $mycard.append($cardReveal);
                $npDiv.append($mycard);

                //Appending to id=display-nonprofit
                $("#resultsRow").append($npDiv);
            }

        }
    });
