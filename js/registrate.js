document.getElementById("registerButton").addEventListener("click", function() {
    var name = document.getElementById('name').value;
    var lastName = document.getElementById('LastName').value;
    var dni = document.getElementById('Dni').value;
    var emailAddress = document.getElementById('EmailAddress').value;
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('passwordConfirm').value;
    var passwordError = document.getElementById('passwordError');
    var passwordMismatchError = document.getElementById('passwordMismatchError');
    var emailEmptyError = document.getElementById('emailEmptyError');
    var dniError = document.getElementById('dniError');
    
    var spinner = document.getElementById('spinner');
    spinner.style.display = 'block';

    // Resetear errores previos
    passwordError.style.display = 'none';
    passwordMismatchError.style.display = 'none';
    emailEmptyError.style.display = 'none';
    dniError.style.display = 'none';
    document.getElementById('password').classList.remove('error');
    document.getElementById('passwordConfirm').classList.remove('error');
    document.getElementById('EmailAddress').classList.remove('errorEmail');

    if (!dni) {
        dniError.style.display = 'block';
        spinner.style.display = 'none';
        return;
    }

    if (!emailAddress) {
        emailEmptyError.style.display = 'block';
        spinner.style.display = 'none';
        return;
    }

    if (password !== confirmPassword) {
        passwordMismatchError.style.display = 'block';
        document.getElementById('passwordConfirm').classList.add('error');
        spinner.style.display = 'none';
        return;
    }

    // Proceder con el registro
    fetch('https://localhost:7061/api/Authentication/Register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: name, lastName: lastName, dni: dni, emailAddress: emailAddress, password: password, confirmPassword: confirmPassword })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Registro fallido');
        }
        return response.json();
    })
    .then(data => {
        localStorage.setItem('registerSuccess', 'Registro exitoso. Ahora puedes iniciar sesión.');
        localStorage.setItem('confirmEmailReminder', 'No olvide confirmar el mail antes de iniciar sesión.');
        window.location.href = "codigoVerificacion.html";
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById("registerButton").classList.add("error-btn");
    })
    .finally(() => {
        spinner.style.display = 'none';
    });
});

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('togglePassword').addEventListener('click', function() {
        var passwordField = document.getElementById('password');
        var type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordField.setAttribute('type', type);
        this.textContent = type === 'password' ? '🙈' : '👁️';
    });
});


document.addEventListener('DOMContentLoaded', function() {
    //evento de clic al botón "Volver"
    document.getElementById("backButton").addEventListener("click", function() {
        window.location.href = "verificarEmail.html";
    })});