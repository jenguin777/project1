$(document).ready(function() {

//Categories data values: 
//Animals = 1 
//Arts, Culture, Humanities = 2 
//Education = 3 
//Environment = 4
//Health = 5 
//Human Services = 6
//Human and Civil Rights = 8
//Religion = 9
//Research and Public Policy = 11


   var city = "&city=Durham";

   var categoryName = "&categoryID=1"
   
   var pageSize = "&pageSize=10";

   var queryURL = "https://api.data.charitynavigator.org/v2/Organizations?app_id=8a6cb061&app_key=2314291975d64eb1828a504d597b3b47&rated=TRUE&state=NC" + city + pageSize + categoryName; 

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

    }








});