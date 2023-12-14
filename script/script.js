//an event listener that runs before the page is loaded
// document.addEventListener("DOMContentLoaded", function() {
fetch('/nav.html').then(function (response) {
    return response.text();
}).then(function (data) {
    

    document.getElementById('nav-head').innerHTML = data;
    //set athe active class on the current page
    var url = window.location.pathname;
    //get the filename from the url but files can be nested into folders
    var filename = url.substring(url.lastIndexOf('/') + 1);

    var navItems = document.getElementById("nav-body").getElementsByClassName('nav-item');
    for (var i = 0; i < navItems.length; i++) {
        var tag = navItems[i].getElementsByTagName('a')[0];
        if (tag != null && tag.hasAttribute('href')) {
            var href = tag.getAttribute('href');
            //if url contains the href
            if (filename.includes(href)) {
                navItems[i].classList.add('active');
            }
        }
    }
    //if contains menu_page than set Carta to active
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "https://cdn.jsdelivr.net/npm/js-cookie@3.0.1/dist/js.cookie.min.js"
    document.head.appendChild(s).addEventListener("load", function () {
        if (localStorage.getItem("cart") != null) {
            var cart = JSON.parse(localStorage.getItem("cart"));
            var cartCount = 0;
            for (var product in cart) {
                cartCount += Number(cart[product]);
            }
            document.getElementById('cart-count').innerHTML = cartCount;
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
        }
    });

});
fetch('/footer.html').then(function (response) {
    return response.text();
}).then(function (data) {
    var footer = document.getElementById('footer')
    if(footer == null){
        return;
    }
    footer.innerHTML = data;
    footer.classList.add('mt-auto');
});
document.addEventListener("DOMContentLoaded", function () {



    // Resto del código general
});