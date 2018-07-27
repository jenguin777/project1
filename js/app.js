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

    var categoryImages = [{category:"Animals",url:"Animals1.jpg",catNum:"1"},{category:"ArtsCultureHumanities",url:"ArtsCultureHumanities2.jpg",catNum:"2"},
                            {category:"Education",url:"Education3.jpg",catNum:"3"},{category:"Environment",url:"Environment4.jpg",catNum:"4"},
                            {category:"Health",url:"Health5.jpg",catNum:"5"},{category:"HumanServices",url:"HumanServices6.jpg",catNum:"6"},
                            {category:"HumanCivilRights",url:"HumanCivilRights8.jpg",catNum:"8"},{category:"Religion",url:"Religion9.jpg",catNum:"9"},
                            {category:"ResearchPublicPolicy",url:"ResearchPublicPolicy11.jpg",catNum:"11"}];
    
    var states= ["alabama","alaska","arizona","arkansas","california","colorado","delaware","florida","georgia","hawaii","idaho",
    "illinois","indiana","indiana","iowa","kansas","kentucky","louisiana","maine","maryland","michigan","minnesota",
    "missouri","newjersey","newmexico","newyork","northcarolina","ohio","oklahoma","oregon","tennessee","texas","utah",
    "vermont","virginia","wisconsin","wyoming"];
    
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
    
    // Assign my database ref for folder TrainScheduler to a variable
    var db = firebase.database();
    var jjdb = db.ref("Project1");
    
    for (var i=0;i<states.length;i++) {
        $("#dropdown1").append('<li><a href="#!">'+states[i]+'</a></li>');
    }
    console.log(categoryImages);
    for (var i=0;i<categoryImages.length;i++) {
        var catDiv = $('<div class="col s6 m4 category" data="'+categoryImages[i].catNum+'">');
        var cardA = $('<a href="results.html" target="_blank"></a>');
        var cardDiv = $('<div class="card small"  style="height: 120px;border: 2px solid darkgray;border-radius: 7px"></div>');
        var cardImg = $('<div class="card-image" style="max-height: 100%; overflow: none;"></div>');              
        cardImg.append('<img class="responsive-img" src="images/'+categoryImages[i].url+'">');
        cardImg.append('<span class="card-title">'+categoryImages[i].category+'</span>');
        cardDiv.append(cardImg);
        cardA.append(cardDiv);
        catDiv.append(cardA);
        $("#catRow").append(catDiv);
    }

    function makeFavCard (favName,favPic,favStat,favUrl) {
        jjdb.push ({
            FavCharity : favName,
            CharityPic : favPic,
            CharStat : favStat,
            CharUrl : favUrl
        });
      }

    var lengthFavList=0;

    jjdb.on("child_added", function(childSnapshot) {

        lengthFavList++;
        var $npDiv = $('<div id="indexFav-'+lengthFavList+'" class="col s6 m4 cardcol for-buttons" data-Name="'+childSnapshot.val().FavCharity+'"></div>');

        //Card Div
        var $mycard = $('<div class="card" style="height:275px"></div>');

        var $cardContent = $('<div class="card-image waves-effect waves-block waves-light"><img class="activator" src="'+childSnapshot.val().CharityPic +'" style="height:130px";></div>');

        var $cardContentAction = $('<div class="card-action" style="height:40%;padding: 5px 18px;">');
        
        var $cardContentSpan=$('<p class="card-title activator grey-text text-darken-4" style="font-size:20px;line-height:1.4rem;" ></span>');
        $cardContentSpan.text(childSnapshot.val().FavCharity);

        var $icon = $("<i>");
        $icon.addClass("material-icons right");
        $icon.text("more_vert");

        $cardContentSpan.append($icon);
        $cardContentAction.append($cardContentSpan);

        //Card Reveal Creation
        var $cardReveal = $("<div>");
        $cardReveal.addClass("card-reveal");

        var $cardRevealSpan = $("<p>");
        $cardRevealSpan.addClass("card-title grey-text text-darken-4");
        $cardRevealSpan.css({"font-size":"16px","line-height":"1.4rem" });
        $cardRevealSpan.append(childSnapshot.val().FavCharity);

        var $cardRevealIcon = $("<i>");
        $cardRevealIcon.addClass("material-icons right");
        $cardRevealIcon.css({"margin-left":"0","line-height":"1.25" });
        $cardRevealIcon.text("close");

        $cardRevealSpan.append($cardRevealIcon);

        var $cardRevealP = $('<p style="color:black">');
        $cardRevealP.text(childSnapshot.val().CharStat);
        var $cardRevealP2 = $("<p>");
        var $cardRevealLink1 = $('<a href="'+childSnapshot.val().CharUrl+'" target="_blank" style="color:fuchsia">');
        $cardRevealLink1.text("Contribute");
        $cardRevealP2.append($cardRevealLink1);
        var $cardRevealP3 = $("<p>");
        var $cardRevealBtn = $('<button class="checkbox" data="'+ lengthFavList+'"></button>"');
        $cardRevealBtn.text("X");
        $cardRevealP3.append($cardRevealBtn);

        $cardReveal.append($cardRevealSpan).append($cardRevealP).append($cardRevealP2).append($cardRevealP3);

        // Appending CardImg, CardContent, and Card Reveal to its div
        $mycard.append($cardContent);
        $mycard.append($cardContentAction);
        $mycard.append($cardReveal);
        $npDiv.append($mycard);
        
        $("#favRow").append($npDiv);   
        // Handle the errors
    }, function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });
    
    $("#favRow").on("click", ".checkbox", function () {
        var indexFavClicked = $(this).attr("data");
        var del_name = $("#indexFav-"+indexFavClicked).attr("data-Name");
        $("#indexFav-"+indexFavClicked).remove();
        console.log(del_name);
        
        jjdb.orderByChild('FavCharity').equalTo(del_name)
            .once('value').then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
            //remove each child
            jjdb.child(childSnapshot.key).remove();
            });
        });
    });

    //    var city = "";

       var state = "";
       
       var categoryId = localStorage.getItem("category");
    
       function callCharApi (cat) {
        
        var queryURL = "https://api.data.charitynavigator.org/v2/Organizations?&app_id=d555fab3&app_key=21adfc6c878ba1839bb8e6a8e0838951&pageSize=9&rated=true&state=NC&categoryID="+cat; 

    
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
            $('.opening-hours').append('<li>'+data[0].mission+"</li>");

            //Loop Through Data Returned 

            for (var i = 0; i <data.length; i++) {
                //most-outer Div
                var $npDiv = $('<div id="index-'+i+'" class="col s6 m4 cardcol for-buttons" data-Name="'+data[i].charityName+'"></div>');

                //Card Div
                var $mycard = $('<div class="card" style="height:275px"></div>');

                var $cardContent = $('<div class="card-image waves-effect waves-block waves-light"><img class="activator" src="images/'+categoryImages[i].url +'" style="height:130px";></div>');

                var $cardContentAction = $('<div class="card-action" style="height:40%;padding: 5px 18px;">');
                
                var $cardContentSpan=$('<p class="card-title activator grey-text text-darken-4" style="font-size:20px;line-height:1.4rem;" ></span>');
                $cardContentSpan.text(data[i].charityName);

                var $icon = $("<i>");
                $icon.addClass("material-icons right");
                $icon.text("more_vert");

                $cardContentSpan.append($icon);
                $cardContentAction.append($cardContentSpan);

                //Card Reveal Creation
                var $cardReveal = $("<div>");
                $cardReveal.addClass("card-reveal");

                var $cardRevealSpan = $("<p>");
                $cardRevealSpan.addClass("card-title grey-text text-darken-4");
                $cardRevealSpan.css({"font-size":"16px","line-height":"1.4rem" });
                $cardRevealSpan.append(data[i].charityName);

                var $cardRevealIcon = $("<i>");
                $cardRevealIcon.addClass("material-icons right");
                $cardRevealIcon.css({"margin-left":"0","line-height":"1.25" });
                $cardRevealIcon.text("close");

                $cardRevealSpan.append($cardRevealIcon);

                var $cardRevealP = $("<p>");
                $cardRevealP.text(data[i].irsClassification.deductibility);
                var $cardRevealP2 = $("<p>");
                var $cardRevealLink1 = $('<a href="'+data[i].websiteURL+'" target="_blank" style="color:fuchsia">');
                $cardRevealLink1.text("Contribute");
                $cardRevealP2.append($cardRevealLink1);
                var $cardRevealP3 = $("<p>");
                var $cardRevealBtn = $('<button data="'+i+'" class="favChar"></button>');
                $cardRevealBtn.text("My Fav");
                $cardRevealP3.append($cardRevealBtn);

                $cardReveal.append($cardRevealSpan).append($cardRevealP).append($cardRevealP2).append($cardRevealP3);

                // Appending CardImg, CardContent, and Card Reveal to its div
                $mycard.append($cardContent);
                $mycard.append($cardContentAction);
                $mycard.append($cardReveal);
                $npDiv.append($mycard);

                //Appending to id=display-nonprofit
                $("#resultsRow").append($npDiv);
            }
            }
        }

        callCharApi(categoryId);


        // Click handler for adding a gif to favorites
        $("#catRow").on("click", ".category", function () {

            // Grab the index info
            var catClicked = $(this).attr("data");
            console.log(catClicked);
            newCategoryId = catClicked;
            localStorage.setItem("category",newCategoryId);
        });

        // Click handler for adding a gif to favorites
        $(".char-card").on("click", ".favChar", function () {

            // Grab the index info
        var nameClicked = $(this).attr("data");
        console.log(nameClicked);
            // Remove the gif from search
        var copyName = $("#index-"+nameClicked).attr("data-Name");
        var copyPic = $("#index-"+nameClicked+ ' .card .card-image img').attr("src");
        var copyStat = $("#index-"+nameClicked+ ' .card .card-reveal :nth-child(2)').text();
        var copyUrl = $("#index-"+nameClicked+ ' .card .card-reveal p a').attr("href");
        makeFavCard(copyName,copyPic,copyStat,copyUrl);

            // Copy it to favorites container
        });
    });
