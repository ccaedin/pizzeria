//an event listener that runs before the page is loaded
// document.addEventListener("DOMContentLoaded", function() {
fetch('/nav.html').then(function (response) {
    return response.text();
}).then(function (data) {
    document.getElementById('nav-head').innerHTML = data;
});
fetch('/footer.html').then(function (response) {
    return response.text();
}).then(function (data) {
    document.getElementById('footer').innerHTML = data;
});
document.addEventListener("DOMContentLoaded", async function () {

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