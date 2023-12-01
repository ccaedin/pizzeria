// login.js

function saveCredentials(email, password) {
    // Guardar credenciales en cookies
    Cookies.set('rememberMe', 'true', { expires: 7 });
    Cookies.set('userEmail', email, { expires: 7 });
    Cookies.set('userPassword', password, { expires: 7 });
}

function clearCredentials() {
    // Eliminar cookies de credenciales
    Cookies.remove('rememberMe');
    Cookies.remove('userEmail');
    Cookies.remove('userPassword');
}

document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById('loginForm');

    if (loginForm) {
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const email = document.getElementById('e-mail').value;
            const password = document.getElementById('password').value;

            // Validar el formato del correo electrónico y la contraseña
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

            if (!emailRegex.test(email) || !passwordRegex.test(password)) {
                alert('Formato de correo electrónico o contraseña incorrecto');
                return;
            }

            // Guardar credenciales en cookies si la casilla "Recuérdame" está marcada
            const rememberMeCheckbox = document.getElementById('rememberMe');
            if (rememberMeCheckbox.checked) {
                saveCredentials(email, password);
            } else {
                clearCredentials();
            }

            // Redirigir a la página anterior (o a la página por defecto si no hay una página anterior)
            const previousPage = document.referrer || './index.html';
            window.location.href = previousPage;
        });
    }

    // Resto del código para manejar "Recuérdame" y otras funcionalidades
});
