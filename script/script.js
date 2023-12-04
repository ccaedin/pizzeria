//an event listener that runs before the page is loaded
// document.addEventListener("DOMContentLoaded", function() {
fetch('/nav.html').then(function (response) {
    return response.text();
}).then(function (data) {
    document.getElementById('nav-head').innerHTML = data;
    //set athe active class on the current page
    var url = window.location.pathname;
    var filename = url.substring(url.lastIndexOf('/') + 1);
    var navItems = document.getElementsByClassName('nav-item');
    for (var i = 0; i < navItems.length; i++) {
        var href = navItems[i].getElementsByTagName('a')[0].getAttribute('href');
        if (filename == href) {
            navItems[i].classList.add('active');
        }
    }
});
fetch('/footer.html').then(function (response) {
    return response.text();
}).then(function (data) {
    var footer =document.getElementById('footer')
    footer.innerHTML = data;
    footer.classList.add('mt-auto');
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