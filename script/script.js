//an event listener that runs before the page is loaded
// document.addEventListener("DOMContentLoaded", function() {
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}
function removeCookie(name) {
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};
document.addEventListener("DOMContentLoaded", function () {
    var navText = `
    <nav id="nav-body" class="navbar sticky-top navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
        <a class="navbar-brand" href="/">Pizzería</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
            aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                        aria-expanded="false">
                        Who we are
                    </a>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="/restaurantes.html">Establecimientos</a></li>
                        <li><a class="dropdown-item" href="/form.html">Atención al Cliente</a></li>
                        <li><a class="dropdown-item" href="/aboutus.html">Acerca de</a></li>
                    </ul>
                </li>
            </ul>
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                <li class="nav-item">
                    <a class="nav-link" href="/index.html">Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" aria-current="page" href="/menu_page/pizza.html">Carta</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/menu_page/promociones.html">Promociones</a>
                </li>
                <li id="nav-profile" class="nav-item">
                    <!-- Contenedor para acciones de usuario -->

                    <div class="user-actions">
                        <!-- Iniciar sesión (oculto) -->
                        <a id="loginLink" class="nav-link" href="/log-in.html">Iniciar sesión</a>
                        <!-- Cerrar sesión (oculto inicialmente) -->
                        <ul class="navbar-item dropdown p-0" style="display: none;">
                            <button class="btn btn-secondary dropdown-toggle" type="button" id="userDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                                <span id="userEmail">Correo Electrónico</span>
                            </button>
                            <ul class="dropdown-menu" aria-labelledby="userDropdown">
                                <li><a class="dropdown-item" href="#" id="logoutLink">Cerrar sesión</a></li>
                                <!-- Otros elementos del menú desplegable si es necesario -->
                            </ul>
                        </ul>
                    </div>
                </li>
                <li class="nav-item">
                    <a href="/menu_page/pago.html" class="btn btn-danger">Carrito (<span id='cart-count'>0</span>)</a>
                </li>
            </ul>
        </div>
    </div>
</nav>

    `
    document.getElementById('nav-head').innerHTML = navText;
    //set athe active class on the current page
    var url = window.location.pathname;
    //in nav-head find the link that is the same as the hr
    //find the a tag that has href = url
    var links = document.querySelectorAll('#nav-head a');
    links.forEach(link => {
        if (link.href.includes(url)) {
            link.classList.add('active');
            //add aria 
            link.setAttribute('aria-current', 'page');
        }
    });
    
    //if contains menu_page than set Carta to active
    if (localStorage.getItem("cart") != null) {
        var cart = JSON.parse(localStorage.getItem("cart"));
        var cartCount = 0;
        for (var product in cart) {
            cartCount += Number(cart[product]);
        }
    }
    else {
        cartCount = 0;
    }
    document.getElementById('cart-count').innerHTML = cartCount;
    const userEmail = getCookie('userEmail');
    const isLoggedIn = getCookie('isLoggedIn');

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
            removeCookie('userEmail');
            removeCookie('isLoggedIn');
            window.location.href = '/log-in.html';
        });
    }
    var footerText = `
    <footer class="mt-auto pt-3 border-top">
    <p class="text-center text-muted">© 2021 Pizzeria</p>
    <ul class="nav justify-content-between border-bottom pb-3 px-5 bg-secondary">
        <li class="nav-item"><a href="/" class="nav-link px-2 text-muted">Home</a></li>
        <li class="nav-item"><a href="/menu_page/promociones.html" class="nav-link px-2 text-muted">Productos</a></li>
        <li class="nav-item"><a href="/menu_page/promociones.html" class="nav-link px-2 text-muted">Nutricion y calidad</a></li>
        <li class="nav-item"><a href="/privacy.html" class="nav-link px-2 text-muted">Aviso legal</a></li>
        <li class="nav-item"><a href="/privacy.html" class="nav-link px-2 text-muted">Privacidad</a></li>
    </ul>
    </footer>
    `
    var footer = document.getElementById('footer')
    footer.innerHTML = footerText;
    footer.classList.add('mt-auto');
});