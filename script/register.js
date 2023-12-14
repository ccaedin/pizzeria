document.addEventListener("DOMContentLoaded", function () {
    const registerForm = document.getElementById('registerForm');

    registerForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm_password').value;
        const fullName = document.getElementById('full_name').value;
        const address = document.getElementById('address').value;
        const postalCode = document.getElementById('postal_code').value;


        // Validar el formato del correo electrónico y la contraseña
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

        if (!emailRegex.test(email)) {
            alert('Formato de correo electrónico incorrecto');
            return;
        }

        if (!passwordRegex.test(password)) {
            alert('Formato de contraseña incorrecto');
            return;
        }

        if (password !== confirmPassword) {
            alert('Contraseña de confirmación y contraseña son diferentes');
            return;
        }

        if (fullName.trim() === '' || address.trim() === '' || postalCode.trim() === '') {
            alert('Por favor, completa todos los campos');
            return;
        }

        // Crear objeto de cuenta
        const newAccount = { email, password, fullName, address, postalCode };

        // Cargar cuentas existentes desde el localStorage
        const existingAccounts = loadAccounts();

        // Verificar si el correo electrónico ya está registrado
        if (existingAccounts.some(account => account.email === email)) {
            alert('Este correo electrónico ya está registrado');
            return;
        }

        // Agregar la nueva cuenta al arreglo existente
        existingAccounts.push(newAccount);

        // Guardar el arreglo actualizado en el localStorage
        saveAccounts(existingAccounts);

        alert('Cuenta registrada con éxito');
        window.location.href = "./log-in.html";
    });

    // Función para cargar cuentas desde el localStorage
    function loadAccounts() {
        const existingAccounts = localStorage.getItem('accounts');
        return existingAccounts ? JSON.parse(existingAccounts) : [];
    }

    // Función para guardar cuentas en el localStorage
    function saveAccounts(accounts) {
        localStorage.setItem('accounts', JSON.stringify(accounts));
    }
});
