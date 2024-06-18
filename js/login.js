document.addEventListener('DOMContentLoaded', function() {
    // Obtener mensajes de localStorage
    var successMessage = localStorage.getItem('registerSuccess');
    var reminderMessage = localStorage.getItem('confirmEmailReminder');
    // Mostrar mensajes si existen
    if (successMessage) {
        document.getElementById('successMessage').innerText = successMessage;
        localStorage.removeItem('registerSuccess'); // Borrar el mensaje después de mostrarlo
    }
    if (reminderMessage) {
        document.getElementById('reminderMessage').innerText = reminderMessage;
        localStorage.removeItem('confirmEmailReminder'); // Borrar el mensaje después de mostrarlo
    }
    // Añadir eventos input a los campos para eliminar el estado de error al escribir
    document.getElementById('EmailAddress').addEventListener('input', function() {
        if (this.value) {
            this.classList.remove('error');
            document.getElementById('emailError').style.display = 'none';
        }
    });
    document.getElementById('password').addEventListener('input', function() {
        if (this.value) {
            this.classList.remove('error');
            document.getElementById('passwordError').style.display = 'none';
            document.getElementById('invalidPasswordError').style.display = 'none';
        }
    });
    // Añadir evento click para mostrar/ocultar la contraseña
    document.getElementById('togglePassword').addEventListener('click', function() {
        var passwordField = document.getElementById('password');
        var type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordField.setAttribute('type', type);
        this.textContent = type === 'password' ? '👁️' : '🙈';
    });

    // Añadir evento click para el enlace de "Olvidaste tu contraseña"
    document.getElementById('forgotPasswordLink').addEventListener('click', function(event) {
        event.preventDefault(); 
        var spinner = document.querySelector('.loading-spinner');
        spinner.style.display = 'block'; 
        setTimeout(function() {
            window.location.href = 'generatePassword.html'; 
        }, 500);
    });
});

document.getElementById("loginButton").addEventListener("click", function() {
    var emailAddress = document.getElementById('EmailAddress').value;
    var password = document.getElementById('password').value;
    var spinner = document.querySelector('.loading-spinner');
    var emailError = document.getElementById('emailError');
    var passwordError = document.getElementById('passwordError');
    var invalidPasswordError = document.getElementById('invalidPasswordError');
    // Resetear errores previos
    emailError.style.display = 'none';
    passwordError.style.display = 'none';
    invalidPasswordError.style.display = 'none';
    document.getElementById('EmailAddress').classList.remove('error');
    document.getElementById('password').classList.remove('error');
    // Validar campos requeridos
    var valid = true;
    if (!emailAddress) {
        emailError.style.display = 'block';
        document.getElementById('EmailAddress').classList.add('error');
        valid = false;
    }
    if (!password) {
        passwordError.style.display = 'block';
        document.getElementById('password').classList.add('error');
        valid = false;
    }
    // Si los campos no son válidos, no continuar
    if (!valid) {
        return;
    }
    spinner.style.display = 'block';
    fetch('https://localhost:7061/api/Authentication/Login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ EmailAddress: emailAddress, password: password })
    })
    .then(response => {
        if (!response.ok) {
            return response.text().then(text => { throw new Error(text) });
        }
        return response.json();
    })
    .then(data => {
        document.getElementById("loginButton").classList.remove("error-btn");
        document.getElementById("loginButton").classList.add("success-btn");
        window.location.href = "pagina_de_inicio.html";
    })
    .catch(error => {
        console.error('Error:', error);
        // Mostrar el mensaje de error de contraseña inválida
        invalidPasswordError.style.display = 'block';
        document.getElementById('password').classList.add('error');
        
        document.getElementById("loginButton").classList.add("error-btn");
    })
    .finally(() => {
        setTimeout(function() {
            spinner.style.display = 'none';
        }, 2000);
    });
});
