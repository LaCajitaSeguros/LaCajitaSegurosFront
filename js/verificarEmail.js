document.getElementById("loginButton").addEventListener("click", function() {
    var emailAddress = document.getElementById('EmailAddress').value;
    var emailError = document.getElementById('emailError');
    var spinner = document.querySelector('.spinner');
    var overlay = document.getElementById('overlay');

    // Mostrar overlay y spinner
    overlay.classList.add('show');
    spinner.style.display = 'block';

    emailError.style.display = 'none';
    document.getElementById('EmailAddress').classList.remove('errorEmail');
    
    if (!emailAddress) {
        emailError.style.display = 'block';
        // Ocultar overlay y spinner si hay error
        setTimeout(() => {
            overlay.classList.remove('show');
            spinner.style.display = 'none';
        }, 2000); // Mostrar el overlay durante 2 segundos
        return;
    }
    
    fetch('https://localhost:7061/api/Authentication/CheckEmail', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ EmailAddress: emailAddress })
    })
    .then(response => response.json())
    .then(data => {
        if (data.exists) {
            emailError.style.display = 'block';
            document.getElementById('EmailAddress').classList.add('errorEmail');
            emailError.textContent = 'El correo ya está registrado.';
            // Redirigir a login.html después de 2 segundos
            setTimeout(() => {
                window.location.href = '../HTML/login.html';
            }, 2000);
        } else {
            document.getElementById('successMessage').textContent = 'El correo no está registrado.';
            // Redirigir a registrate.html después de 2 segundos
            setTimeout(() => {
                window.location.href = '../HTML/registrate.html';
            }, 2000);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    })
    .finally(() => {
        // Ocultar overlay y spinner al finalizar la carga
        setTimeout(() => {
            overlay.classList.remove('show');
            spinner.style.display = 'none';
        }, 2000); // Mostrar el overlay durante 2 segundos
    });
});
