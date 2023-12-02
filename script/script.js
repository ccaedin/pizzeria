document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("addressForm").addEventListener("submit", handleAddress);
});

document.addEventListener("DOMContentLoaded", function () {
    const userEmail = Cookies.get('userEmail');
    const isLoggedIn = Cookies.get('isLoggedIn')

    if (isLoggedIn) {
        // El usuario está autenticado, cambia el contenido del contenedor de acciones de usuario
        const userActionsContainer = document.querySelector('.user-actions');
    
        // Iniciar sesión (oculto)
        const loginLink = document.getElementById('loginLink');
        loginLink.style.display = 'none';
    
        // Cerrar sesión (visible)
        const dropdown = userActionsContainer.querySelector('.dropdown');
        const userEmailSpan = document.getElementById('userEmail');
        userEmailSpan.innerText = userEmail;  // Actualiza el contenido con el correo electrónico
        dropdown.style.display = 'inline';
    
        logoutLink.addEventListener('click', function () {
            // Elimina las cookies al cerrar sesión
            Cookies.remove('userEmail');
            Cookies.remove('isLoggedIn');
        });
    }

    // Inicializa Bootstrap para el menú desplegable
    new bootstrap.Dropdown(document.getElementById('userDropdown'));

    // Resto del código general
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