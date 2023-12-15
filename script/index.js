document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("addressForm").addEventListener("submit", handleAddress);

    //if the page contains ?error=address flash the introduce domicilio tab
    const urlParams = new URLSearchParams(window.location.search);
    const error = urlParams.get('error');
    if (error == "address") {
        //flash domicilio_adress tab through javascript
        document.getElementById("domicilio_address").classList.add("flash");
        //remove flash clash when domicilio_address tab is clicked
        document.getElementById("domicilio_address").addEventListener("click", function () {
            document.getElementById("domicilio_address").classList.remove("flash");
        });

    }
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
                    //if it is the recojida tab then display restaurante 1 or 2 if the address is in madrid or barcelona
                    if (document.getElementById("tab_container").getElementsByClassName("nav-link active")[0].id == "nav-recogida-tab") {
                        if (results[0].formatted_address.includes("Madrid")) {
                            document.getElementById("domicilio_address").value = "Restaurante 1";
                        } else if (results[0].formatted_address.includes("Barcelona")) {
                            document.getElementById("domicilio_address").value = "Restaurante 2";
                        }
                    }
                    setAddress();
                }
            }
        }
    );
}

function setAddress() {
    var address = document.getElementById("domicilio_address").value;
    console.log(address);
    var data = {
        address: address,
        //find which tab is active to determine a domicilio or a recogida
        type: document.getElementById("tab_container").getElementsByClassName("nav-link active")[0].id == "nav-domicilio-tab" ? "domicilio" : "recogida"
    }
    //get the current user from the cookie
    var email = getCookie("userEmail");
    if (email == null) {
        window.sessionStorage.setItem("addressDetails", JSON.stringify(data));
        return;
    }
    //find the user in the database
    var accounts = JSON.parse(localStorage.getItem("accounts"));
    var user = accounts.find(account => account.email === email);
    //update the user address
    user.address = address;
    var codePostal = address.match(/\d+/g).reduce(function (a, b) { return a.length > b.length ? a : b; });
    user.postalCode = codePostal;
    //save the user in the database
    localStorage.setItem("accounts", JSON.stringify(accounts));
    //set the address in the cookie
    document.cookie = `address=${address}; path=/`;
    document.cookie = `postalCode=${codePostal}; path=/`;
    document.cookie = `type=${data.type}; path=/`;
    

}
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}
/**
 * 
 * @param {SubmitEvent} e 
 */
function handleAddress(e) {

    e.preventDefault();
    setAddress();
    //redirect to menu page
    window.location.href = "/menu_page/promociones.html";
}

function addToCart(item) {
    //if address is not set flash the introduce domicilio tab
    if (window.localStorage.getItem("addressDetails") == null) {
        window.location.href = "/?error=address";
    }
    //redirect to promociones.html?add=item
    window.location.href = "/menu_page/promociones.html?add=" + item;
}