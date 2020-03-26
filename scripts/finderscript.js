//JS code for finder.html goes here

/*
    Resources Used:
    https://www.w3schools.com/html/html5_geolocation.asp
    https://www.youtube.com/watch?v=H7gZ2hEjwuI

*/

/*
    so update so far this commit.

    i was able get a request for a lat and long coordinates using HTML5 geolocation.

    for computers without GPS capabilities... it will take the IP location which can be innacurate sometimes
    but that is unavoidable.

    I will in the future attempt to use the coordinates to interact with google's reverse geocoding service.
*/

//alert("JS load test1");

document.onload = getLocationData();

function getLocationData() {
    //alert("JS load test2");
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
        
    } else {
        alert("Geolocation is not supported by this browser");
    }

    console.log("automatic submit test");

}

function showPosition(position) {
    //alert("Latitude: " + position.coords.latitude + " Longitude: " + position.coords.longitude);
    geocodeInitialise(position.coords.latitude, position.coords.longitude);
}

function geocodeInitialise(lat, lng) {
    var LAT = lat;
    var LNG = lng;

    let geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${LAT},${LNG}&key=AIzaSyBzvmigqjNkN6HZiQjle8GhYSwl_DHhL38`;
    fetch(geocodeURL)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        var formattedAddress = data.results[0].formatted_address;
        sendToMap(formattedAddress);

    })
    .catch(err => console.warn(err.message));
    
}

function sendToMap(formattedAddress) {
    var uriFormatted = encodeURIComponent(formattedAddress);

    //alert(uriFormatted);

    var mapLink = "https://www.google.com/maps/embed/v1/search?q="
    //searchTerm must be URI Formatted!
    var searchTerm = "rpg%20gaming%20stores"
    var searchArea = uriFormatted;
    var APIKey = "AIzaSyBzvmigqjNkN6HZiQjle8GhYSwl_DHhL38";

    mapSource = mapLink + searchTerm + searchArea + "&key=" + APIKey;

    $(".map-container").empty();
    $(".map-container").append("<iframe width='600' height='450' frameborder='0' style='border:0' src=" + mapSource + " allowfullscreen></iframe>");
}

function manualMap(e) {
    
    if (e.preventDefault) e.preventDefault();

    var manualLocation = $("#locationinput").val();

    sendToMap(manualLocation);
    
    console.log("manual submit test");

}

var form = document.getElementById('map-search-form');
form.addEventListener("submit", (e) => { manualMap(e) });
 
