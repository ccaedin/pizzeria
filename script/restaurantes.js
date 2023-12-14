var map;
var centerll = { lat: 40.43298728841444, lng: -3.689733673350224 };
var selectedMarker = null;

// Datos ficticios de restaurantes
var restaurantes = [
    { id: 1, lat: 40.43298728841444, lng: -3.689733673350224},
    { id: 2, lat: 41.380445634454375, lng: 2.1862795923315996}
];

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: centerll,
        zoom: 6
    });

    // Agrega marcadores para cada restaurante
    restaurantes.forEach(function (restaurante) {
        var marker = new google.maps.Marker({
            position: { lat: restaurante.lat, lng: restaurante.lng },
            map: map
        });

        // Agrega un evento al hacer clic en un marcador
        marker.addListener('click', function () {
            // Restaurar color del marcador previamente seleccionado
            if (selectedMarker !== null) {
                selectedMarker.setIcon('https://maps.google.com/mapfiles/ms/micons/red-dot.png');
                cambiarColorDiv(selectedMarker.get('id'), 'white');
                ocultarBoton(selectedMarker.get('id'));
            }

            // Cambiar color del marcador seleccionado
            marker.setIcon('https://maps.google.com/mapfiles/ms/micons/blue-dot.png');
            cambiarColorDiv(marker.get('id'), 'lightblue');
            mostrarBoton(marker.get('id'));

            // Almacena el marcador seleccionado
            selectedMarker = marker;
        });

        // Asigna un identificador único al marcador
        marker.set('id', restaurante.id);
    });
}

// Función para cambiar el color del div correspondiente al restaurante del marcador
function cambiarColorDiv(restauranteId, color) {
    var div = document.querySelector('[data-id="' + restauranteId + '"]');
    if (div) {
        // Remover la clase 'bg-primary' de todos los elementos
        document.querySelectorAll('.restaurante-item').forEach(function (element) {
            element.classList.remove('bg-primary', 'text-white');
        });

        // Aplicar las clases de Bootstrap al elemento correspondiente
        div.classList.add('bg-primary', 'text-white');
    }
}

// Función para mostrar el botón correspondiente al restaurante del marcador
function mostrarBoton(restauranteId) {
    var boton = document.querySelector('[data-id="' + restauranteId + '"] .btn-recoger');
    if (boton) {
        boton.style.display = 'inline-block';
        boton.addEventListener('click', function () {
            // Redirige a index.html
            //set the addressDetails to that of the restaurant
            var data = {
                address: "Restaurante " + restauranteId,
                type: "recogida"
            }
            window.localStorage.setItem("addressDetails", JSON.stringify(data));
            window.location.href = 'index.html';
        });
    }
}

// Función para ocultar el botón correspondiente al restaurante del marcador
function ocultarBoton(restauranteId) {
    var boton = document.querySelector('[data-id="' + restauranteId + '"] .btn-recoger');
    if (boton) {
        boton.style.display = 'none';
        boton.removeEventListener('click', null);
    }
}



