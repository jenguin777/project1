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
 
    // An array containing all 9 API relevant nonprofit categories, default category pics, 
    // the API category ID, and shortened photo API search phrases 
    var categoryImages = [{category:"Animals",url:"Animals1.jpg",catNum:"1",photoCat:"Animals"},{category:"Arts Culture Humanities",url:"ArtsCultureHumanities2.jpg",catNum:"2",photoCat:"Arts"},
                        {category:"Education",url:"Education3.jpg",catNum:"3",photoCat:"Education"},{category:"Environment",url:"Environment4.jpg",catNum:"4",photoCat:"Environment"},
                        {category:"Health",url:"Health5.jpg",catNum:"5",photoCat:"Health"},{category:"Human Services",url:"HumanServices6.jpg",catNum:"6",photoCat:"Humanity"},
                        {category:"Human Civil Rights",url:"HumanCivilRights8.jpg",catNum:"8",photoCat:"Civil+Rights"},{category:"Religion",url:"Religion9.jpg",catNum:"9",photoCat:"Religion"},
                        {category:"Research Public Policy",url:"ResearchPublicPolicy11.jpg",catNum:"11",photoCat:"Government"}];
    
    // An array of all 50 state names and their two-letter abbreviations
    var states= [{state:"alabama",abbr:"AL"},{state:"alaska",abbr:"AK"},{state:"arizona",abbr:"AZ"},{state:"arkansas",abbr:"AR"},{state:"california",abbr:"CA"},
        {state:"colorado",abbr:"CO"},{state:"Connecticut",abbr:"CT"},{state:"delaware",abbr:"DE"},{state:"florida",abbr:"FL"},{state:"georgia",abbr:"GA"},
        {state:"hawaii",abbr:"HI"},{state:"idaho",abbr:"ID"},{state:"illinois",abbr:"IL"},{state:"indiana",abbr:"IN"},{state:"iowa",abbr:"IA"},{state:"kansas",abbr:"KS"},
        {state:"kentucky",abbr:"KY"},{state:"louisiana",abbr:"LA"},{state:"maine",abbr:"ME"},{state:"maryland",abbr:"MD"},{state:"Massachusetts",abbr:"MA"},
        {state:"michigan",abbr:"MI"},{state:"minnesota",abbr:"MN"},{state:"Mississippi",abbr:"MS"},{state:"missouri",abbr:"MO"},{state:"Montana",abbr:"MT"},
        {state:"Nebraska",abbr:"NE"},{state:"Nevada",abbr:"NV"},{state:"New Hampshire",abbr:"NH"},{state:"newjersey",abbr:"NJ"},{state:"newmexico",abbr:"NM"},
        {state:"newyork",abbr:"NY"},{state:"northcarolina",abbr:"NC"},{state:"NorthDakota",abbr:"ND"},{state:"ohio",abbr:"OH"},{state:"oklahoma",abbr:"OK"},
        {state:"oregon",abbr:"OR"},{state:"Pennsylvania",abbr:"PA"},{state:"RhodeIsland",abbr:"RI"},{state:"SouthCarolina",abbr:"SC"},{state:"SouthDakota",abbr:"SD"},
        {state:"tennessee",abbr:"TN"},{state:"texas",abbr:"TX"},{state:"utah",abbr:"UT"},{state:"vermont",abbr:"VT"},{state:"virginia",abbr:"VA"},{state:"Washington",abbr:"WA"},
        {state:"WestVirginia",abbr:"WV"},{state:"wisconsin",abbr:"WI"},{state:"wyoming",abbr:"WY"},{state:"DistrictOfColumbia",abbr:"DC"}];
    
    // A currently unused array for category pictures
    var catPicsArray = [];

    // The firebase configuration code
    var config = {
        apiKey: "AIzaSyB3OTKnscA9uQXfdcKUkuPOANkEF-lUVA0",
        authDomain: "projectcodingcamp.firebaseapp.com",
        databaseURL: "https://projectcodingcamp.firebaseio.com",
        projectId: "projectcodingcamp",
        storageBucket: "projectcodingcamp.appspot.com",
        messagingSenderId: "277978229879"
        };
        
    // Inititalize the database
    firebase.initializeApp(config);
    
    // Assign my database ref for folder Project1 to a variable
    var db = firebase.database();
    var jjdb = db.ref("Project1");
    
    // Check local storage to see if a state has been chosen before
    if (localStorage.getItem("state_abbr")){
        // If a state has been chosen display the current state on dropdown button
        for (var i=0;i<states.length;i++) {
            if (states[i].abbr === localStorage.getItem("state_abbr")) {
                $(".dropdown-trigger").attr("style","text-transform:uppercase;");
                $(".dropdown-trigger").text(states[i].state);
            }
        }
    }

    // Write all the states to html for the dropdown trigger on desktop and mobile
    for (var i=0;i<states.length;i++) {
        $("#dropdown1").append('<li><a href="#!">'+states[i].state+'</a></li>');
    }
    for (var i=0;i<states.length;i++) {
        $("#dropdown2").append('<li><a href="#!">'+states[i].state+'</a></li>');
    }

    console.log(categoryImages);

    // Make the call to the Unsplash API based on a category name
    function callUnsplashApi(cat,num) {
        $.ajax({
            url: "https://api.unsplash.com/photos/random?client_id=57ec7e31d50ff96bfc45480b25a75ebc00b710583c46b4763aad264d54172a6b&w=600&h=400&count=1&query="+cat,
            method: "GET"
        }).then(getResults);
        
        // Store the returned category image in local storage
        function getResults(results) {
            console.log(results);
            localStorage.setItem('catPic'+num,results[0].urls.custom);
        }
    }
    // If local storage has no category pics then call the API for each category
    // and store its pic in local storage
    if (!(localStorage.getItem("catPic1"))) {
        for (var i=0;i<categoryImages.length;i++) {
            console.log(categoryImages[i].photoCat);
            callUnsplashApi(categoryImages[i].photoCat,categoryImages[i].catNum);
        }
    }
    // After a less than one second delay in case category pics dont exist and API has to be called
    // Write the nine category cards with their generated category pics to the html
    setTimeout (function(){
    for (var i=0;i<categoryImages.length;i++) {
        var newPic = localStorage.getItem('catPic'+categoryImages[i].catNum);
        var catDiv = $('<div class="col s6 m4 category" data="'+categoryImages[i].catNum+'">');
        var cardA = $('<a href="results.html" target=""></a>');
        var cardDiv = $('<div class="card small"  style="height: 140px; border-radius: 5px; width: 95%;margin-left:auto;margin-right:auto;"></div>');
        var cardImg = $('<div class="card-image" style="max-height: 100%; overflow: none;"></div>');              
        cardImg.append('<img class="responsive-img" src="'+newPic+'">');
        cardImg.append('<span class="card-title">'+categoryImages[i].category+'</span>');
        cardDiv.append(cardImg);
        cardA.append(cardDiv);
        catDiv.append(cardA);
        $("#catRow").append(catDiv);
    }
    },800);

    // A f(x) for pushing pertinent favorite charity info into database storage 
    function makeFavCard (favName,favTag,favPic,favRat,favStat,favUrl) {
        jjdb.push ({
            FavCharity : favName,
            CharityTag : favTag,
            CharityPic : favPic,
            CharRating : favRat,
            CharStat : favStat,
            CharUrl : favUrl
        });
      }
    
    // An unused variable to keep track of the number of favorite charities
    var lengthFavList=0;

    // Write the currently selected category name to the results html page heading
    for (var i=0;i<categoryImages.length;i++) {
        if (localStorage.getItem("category")===categoryImages[i].catNum) {
            $("#resultsDiv h2").text(categoryImages[i].category);
        }
    }
    // Display the currently stored selected category image to the results page
    $("#resultsDiv img").attr("src",localStorage.getItem("catPic"+localStorage.getItem("category")));

    // If any favorites exist in database storage generate a card and display its info in index html 
    jjdb.on("child_added", function(childSnapshot) {

        lengthFavList++;
        var $npDiv = $('<div id="indexFav-'+lengthFavList+'" class="col s6 m4 cardcol for-buttons" data-Name="'+childSnapshot.val().FavCharity+'"></div>');

        //Card Div
        var $mycard = $('<div class="card" style="height:275px; border-radius: 7px;"></div>');

        var $cardContent = $('<div class="card-image waves-effect waves-block waves-light"><img class="activator" src="images/mochaGrunge.png" style="height:130px;"><span class="card-title charity-title" style="padding:15px;">'+childSnapshot.val().FavCharity+'</span></div>');

        var $cardContentAction = $('<div class="card-action" style="padding: 5px 18px;overflow:auto;">');
        
        var $cardContentSpan=$('<p class="card-title activator grey-text text-darken-4" style="font-size:18px;line-height:1.3rem;"></p>');
        $cardContentSpan.text(childSnapshot.val().CharityTag);

        var $icon = $("<i>");
        $icon.addClass("activator material-icons right");
        $icon.text("more_vert");

        // $cardContentSpan.append($icon);
        $cardContentAction.append($cardContentSpan);
        $cardContentAction.append($icon);

        var $cardRatingImg=$('<img src="'+childSnapshot.val().CharRating+'" class="img-rating">');

        //Card Reveal Creation
        var $cardReveal = $("<div>");
        $cardReveal.addClass("card-reveal");

        var $cardRevealSpan = $("<p>");
        $cardRevealSpan.addClass("card-title grey-text text-darken-4");
        $cardRevealSpan.css({"font-size":"22px","line-height":"1.4rem"});
        $cardRevealSpan.append(childSnapshot.val().FavCharity);

        var $cardRevealIcon = $("<i>");
        $cardRevealIcon.addClass("card-reveal-close-icon material-icons right");
        $cardRevealIcon.css({"margin-left":"0","line-height":"1.25" });
        $cardRevealIcon.text("close");

        $cardRevealSpan.append($cardRevealIcon);

        var $cardRevealP = $('<p class="card-reveal-deductible-text">');
        $cardRevealP.text(childSnapshot.val().CharStat);
        var $cardRevealP2 = $("<p class='card-reveal-contribute-button'>");
        var $cardRevealLink1 = $('<a href="'+childSnapshot.val().CharUrl+'" target="_blank">');
        $cardRevealLink1.text("Contribute");
        $cardRevealP2.append($cardRevealLink1);
        var $cardRevealP3 = $("<p>");
        var $cardRevealBtn = $('<button class="checkbox card-reveal-favorite-button" data="'+ lengthFavList+'"></button>"');
        $cardRevealBtn.text("Delete");
        $cardRevealP3.append($cardRevealBtn);

        $cardReveal.append($cardRevealSpan).append($cardRevealP).append($cardRevealP2).append($cardRevealP3);

        // Appending CardImg, CardContent, and Card Reveal to the card div
        $mycard.append($cardContent);
        $mycard.append($cardContentAction);
        $mycard.append($cardRatingImg);
        $mycard.append($cardReveal);
        $npDiv.append($mycard);
        
        // Append the card to the favorites row in index html
        $("#favRow").append($npDiv);   
        // Handle the errors
    }, function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });
    
    // Handle the checkbox click for deleting a favorite charity
    $("#favRow").on("click", ".checkbox", function () {
        var indexFavClicked = $(this).attr("data");
        // Get the name of the charity to be deleted
        var del_name = $("#indexFav-"+indexFavClicked).attr("data-Name");
        // Remove the charity card from html
        $("#indexFav-"+indexFavClicked).remove();
        console.log(del_name);
        
        // Remove the chosen favorite charity from Firebase
        jjdb.orderByChild('FavCharity').equalTo(del_name)
            .once('value').then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
            //remove each child
            jjdb.child(childSnapshot.key).remove();
            });
        });

    });

    // Check to see if a state has been chosen and stored locally for the results page
    // if not assume NC
    if (localStorage.getItem("state_abbr")) {
             var state = localStorage.getItem("state_abbr");
   }
    else {
        var state = "NC";
    }
    // Get the current category chosen from local storage
    var categoryId = localStorage.getItem("category");
    
    // An array to store the mission info returned from the CharityNav API
    var missions =[];

    // A f(x) for calling the charitynav API and passing the category selected by user
    function callCharApi (cat) {
        
        // Check to see if user has selected a category for search
        if (localStorage.getItem("category")) {
            var queryURL = "https://api.data.charitynavigator.org/v2/Organizations?&app_id=d555fab3&app_key=21adfc6c878ba1839bb8e6a8e0838951&pageSize=9&rated=true&state="+state+"&categoryID="+cat; 
        }
        // If not just search for all categories in the current state
        else {
            var queryURL = "https://api.data.charitynavigator.org/v2/Organizations?&app_id=d555fab3&app_key=21adfc6c878ba1839bb8e6a8e0838951&pageSize=9&rated=true&state="+state; 
        }
        // Make the AJAX call to the CharityNav API
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(getData);

        // If data is returned console log the data
        function getData(data) {
            console.log(data);
            console.log(data[0].charityName);
            console.log(data[0].mission);
            console.log("Rating: " + data[0].currentRating.rating);
            console.log(data[0].websiteURL);
            console.log(data[0].irsClassification.subsection);

            //Loop Through Data Returned and create at most nine charity cards for the results

            for (var i = 0; i <data.length; i++) {
                
                // Store the charity name, mission, and mailing address locally in an array 
                missions.push({name: data[i].charityName,mission: data[i].mission,addr: data[i].mailingAddress.streetAddress1+" "+ data[i].mailingAddress.city +", "+data[i].mailingAddress.stateOrProvince + " "+ data[i].mailingAddress.postalCode});

                // Make a div for indexing eacch charity by name
                var $npDiv = $('<div id="index-'+i+'" class="col s6 m4 cardcol for-buttons" data-Name="'+data[i].charityName+'"></div>');

                //Card Div
                var $mycard = $('<div class="card" style="height:275px"></div>');

                var $cardContent = $('<div class="card-image waves-effect waves-block waves-light"><img class="activator" src="images/mochaGrunge.png" style="height:130px;"><span class="card-title charity-title" style="padding:15px;">'+data[i].charityName+'</span></div>');
                
                //var $cardContentAction = $('<div class="card-action" style="height:40%;padding: 5px 18px;">');
                var $cardContentAction = $('<div class="card-action" style="height:40%;overflow:auto;">');
                
                var $cardContentSpan=$('<p class="card-title activator grey-text text-darken-4" style="font-size:15px;line-height:1.0rem; margin:16px;" ></p>');
                $cardContentSpan.append('<span style="font-size: 18px;line-height: 1.2rem;">'+data[i].tagLine+'</span>');

                var $icon = $("<i>");
                $icon.addClass("activator material-icons right");
                $icon.text("more_vert");

                var $cardRatingImg=$('<img src="'+data[i].currentRating.ratingImage.large+'" class="img-rating">');

                //$cardContentSpan.append($icon);
                $cardContentAction.append($cardContentSpan);
                $cardContentAction.append($icon);

                //Card Reveal Creation
                var $cardReveal = $("<div>");
                $cardReveal.addClass("card-reveal");

                // Add the charity name to the card
                var $cardRevealSpan = $("<p>");
                $cardRevealSpan.addClass("card-title grey-text text-darken-4");
                $cardRevealSpan.css({"font-size":"22px","line-height":"1.4rem"});
                $cardRevealSpan.append(data[i].charityName);

                var $cardRevealIcon = $("<i>");
                $cardRevealIcon.addClass("card-reveal-close-icon material-icons right");
                $cardRevealIcon.css({"margin-left":"0","line-height":"1.25" });
                $cardRevealIcon.text("close");

                $cardRevealSpan.append($cardRevealIcon);
                
                // Add a reveal div to display deductible status, url link, and button for adding to favorites
                var $cardRevealP = $("<p class='card-reveal-deductible-text'>");
                $cardRevealP.text(data[i].irsClassification.deductibility);
                var $cardRevealP2 = $("<p class='card-reveal-contribute-button'>");
                var $cardRevealLink1 = $('<a href="'+data[i].websiteURL+'" target="_blank">');
                $cardRevealLink1.text("Contribute");
                $cardRevealP2.append($cardRevealLink1);
                var $cardRevealP3 = $("<p>");
                var $cardRevealBtn = $('<button data="'+i+'" class="favChar card-reveal-favorite-button"></button>');
                $cardRevealBtn.text("Favorites");
                $cardRevealP3.append($cardRevealBtn);

                $cardReveal.append($cardRevealSpan).append($cardRevealP).append($cardRevealP2).append($cardRevealP3);

                // Appending CardImg, CardContent, and Card Reveal to its div
                $mycard.append($cardContent);
                $mycard.append($cardContentAction);
                $mycard.append($cardRatingImg);
                $mycard.append($cardReveal);
                $npDiv.append($mycard);

                //Appending to id=display-nonprofit
                $("#resultsRow").append($npDiv);
            }
        }
    }
    
    // Call the Charity API upon results page load
    callCharApi(categoryId);

    // Assign a new state to local storage upon clicking on the dropdown list
    $("#dropdown1").on("click", "li a", function () {

        // Grab the state info"
        var stateClicked = $(this).text();
        for (i=0;i<states.length;i++) {
            if (states[i].state === stateClicked) {
                localStorage.setItem("state_abbr",states[i].abbr);
            }
        }
        // Change the dropdown header to the new state name 
        $(".dropdown-trigger").attr("style","text-transform:uppercase;");
        $(".dropdown-trigger").text(stateClicked);
    });
    // A copy of the state selection handler for mobile device
    $("#dropdown2").on("click", "li a", function () {

        // Grab the index info"
        var stateClicked = $(this).text();
        for (i=0;i<states.length;i++) {
            if (states[i].state ===stateClicked) {
                localStorage.setItem("state_abbr",states[i].abbr);
            }
        }
        $(".dropdown-trigger").attr("style","text-transform:uppercase;");
        $(".dropdown-trigger").text(stateClicked);
    });

    // Click handler for adding the charity category selected to local storage
    $("#catRow").on("click", ".category", function () {

        // Grab the index info
        var catClicked = $(this).attr("data");
        console.log(catClicked);
        newCategoryId = catClicked;
        localStorage.setItem("category",newCategoryId);
    });

    // START OF GOOGLE MAP FEATURE 
    // Populating Map with the Charity Selected in results 
    // and adding its info from the missions array to the header
    $(".char-card").on("click", ".cardcol", function () {        
        var newURL = $(this).attr("data-Name");
        for (i=0;i<missions.length;i++) {
            if (missions[i].name ===newURL) {
                $('.card-panel h5').text(newURL);
                $('#address-display').text(missions[i].addr);
                $('.opening-hours').html('<li>'+missions[i].mission+"</li>");       
            }
        }
        document.getElementById("charityMap").src ="https://www.google.com/maps/embed/v1/search?key=AIzaSyBIPIXu1T9Mi7cPAIYSlDiwaXMKWAxeB48&zoom=10&q="+ newURL;
    });
    // END OF GOOGLE MAP FEATURE 

    // Click handler for adding a charity to favorites
    $(".char-card").on("click", ".favChar", function () {
    
        // Grab the index charity name attribute
        var nameClicked = $(this).attr("data");
        console.log(nameClicked);
        
        //  Assign the charity name, Rating, deductible status, and website url to local variables   
        var copyName = $("#index-"+nameClicked).attr("data-Name");
        var copyTag = $("#index-"+nameClicked+ ' .card .card-action .card-title span').text();
        console.log(copyName);
        var copyPic = $("#index-"+nameClicked+ ' .card .card-image img').attr("src");
        var copyRating = $("#index-"+nameClicked+ ' .card .img-rating').attr("src");
        var copyStat = $("#index-"+nameClicked+ ' .card .card-reveal :nth-child(2)').text();
        var copyUrl = $("#index-"+nameClicked+ ' .card .card-reveal p a').attr("href");

        // Push the charity local info to the database by calling the database push function
        makeFavCard(copyName,copyTag,copyPic,copyRating,copyStat,copyUrl);

    });
});
