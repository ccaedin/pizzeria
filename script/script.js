document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("addressForm").addEventListener("submit", handleAddress);

});
let autocomplete
function initMap() {
 autocomplete = new google.maps.places.Autocomplete(
    document.getElementById('domicilio_address'), 
    {
        types: ['address'],
        componentRestrictions: { country: ['ES'] },
        fields: ['address_components', 'geometry']
    });
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    //convert lat and lng to address
    var geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    geocoder.geocode(
        { 'latLng': latlng }, 
        function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[0]) {
                    document.getElementById("domicilio_address").value = results[0].formatted_address;
                }
            }
        }
    );
}
/**
 * 
 * @param {SubmitEvent} e 
 */
function handleAddress(e) {
    
    e.preventDefault();
    var address = document.getElementById("domicilio_address").value;
    var data = {
        address: address,
        //find which tab is active to determine a domicilio or a recogida
        type: document.getElementById("tab_container").getElementsByClassName("nav-link active")[0].id == "nav-domicilio-tab" ? "domicilio" : "recogida"
    }
    window.sessionStorage.setItem("addressDetails", JSON.stringify(data));
    //redirect to menu page
    window.location.href = "./carta.html";
    console.log(address);
}