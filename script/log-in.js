// login.js

document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Cargar cuentas existentes desde el localStorage
        const existingAccounts = loadAccounts();

        // Buscar la cuenta correspondiente a las credenciales
        const user = existingAccounts.find(account => account.email === email && account.password === password);

        if (user) {
            // Iniciar sesión y crear cookies
            setSessionCookies(user.email, user.fullName, user.address, user.postalCode);
            alert('Inicio de sesión exitoso');
            // Redirigir a la página principal, por ejemplo
            window.location.href = './index.html';
        } else {
            alert('Credenciales incorrectas');
        }
    });

    // Función para cargar cuentas desde el localStorage
    function loadAccounts() {
        const existingAccounts = localStorage.getItem('accounts');
        return existingAccounts ? JSON.parse(existingAccounts) : [];
    }

    // Función para establecer cookies de sesión
    function setSessionCookies(email, fullName, address, postalCode) {
        document.cookie = `userEmail=${email}; path=/`;
        document.cookie = 'isLoggedIn=true; path=/';
        document.cookie = `fullName=${fullName}; path=/`;
        document.cookie = `address=${address}; path=/`;
        document.cookie = `postalCode=${postalCode}; path=/`;
    }
});



