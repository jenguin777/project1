$(document).ready(function() {

   var state = "&state=NC";
   var city = "&city=Durham";
   var rated = "&rated=TRUE";

   var queryURL = "https://api.data.charitynavigator.org/v2/Organizations?app_id=8a6cb061&app_key=2314291975d64eb1828a504d597b3b47" + state + city + rated; 

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(getData);

    function getData(data) {
        console.log(data);
    }
});