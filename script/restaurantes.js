var map;
var centerll = { lat: 40.43298728841444, lng: -3.689733673350224 };

// Datos ficticios de restaurantes
var restaurantes = [
    { id: 1, name: "Restaurante 1", address: "Dirección 1", phone: "123-456-789", lat: 40.43298728841444, lng: -3.689733673350224 },
    { id: 2, name: "Restaurante 2", address: "Dirección 2", phone: "987-654-321", lat: 41.380445634454375, lng: 2.1862795923315996 }
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
            title: restaurante.name,
            map: map
        });

        // Agrega un evento al hacer clic en un marcador
        marker.addListener('click', function () {
            expandRestaurantInfo(restaurante.name, restaurante.address, restaurante.phone);
        });
    });
}

// Función para expandir la información del restaurante
function expandRestaurantInfo(name, address, phone) {
    var infoContainer = $("#restaurant-info");
    infoContainer.html(`<h3>${name}</h3><p>Dirección: ${address}</p><p>Teléfono: ${phone}</p>`);

    // Realizar la animación de expansión
    infoContainer.slideDown();
}
