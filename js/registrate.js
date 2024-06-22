document.getElementById("registerButton").addEventListener("click", function () {
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
    var nombreError = document.getElementById('nameError');
    var apellidoError = document.getElementById('apellidoError');

    var spinner = document.querySelector('.spinner');

    // Mostrar el spinner
    spinner.style.display = 'block';

    // Resetear errores previos
    passwordError.style.display = 'none';
    passwordMismatchError.style.display = 'none';
    emailEmptyError.style.display = 'none';
    dniError.style.display = 'none';
    nombreError.style.display = 'none';
    apellidoError.style.display = 'none';

    document.getElementById('password').classList.remove('error');
    document.getElementById('passwordConfirm').classList.remove('error');
    document.getElementById('EmailAddress').classList.remove('errorEmail');

    if (!name) {
        nombreError.style.display = 'block';
        spinner.style.display = 'none';
        return;
    }
    if (!lastName) {
        apellidoError.style.display = 'block';
        spinner.style.display = 'none';
        return;
    }

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

    // Validar la contraseña según los criterios
    var passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@\-+?])(?!.*\s).{6,}$/;
    if (!passwordRegex.test(password)) {
        passwordError.style.display = 'block';
        document.getElementById('password').classList.add('error');
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
            console.log("Datos", data);
            localStorage.setItem('registerSuccess', 'Registro exitoso. Ahora puedes iniciar sesión.');
            // Guardar el objeto data completo en localStorage
            localStorage.setItem('userData', JSON.stringify(data));
            localStorage.setItem('userName', JSON.stringify(data.name));

            // Verificar que el userId se haya guardado correctamente
            console.log('userId:', data.userId);
            console.log('userName:', data.name);
            enviarSolicitudPOST();

        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById("registerButton").classList.add("error-btn");
        })
        .finally(() => {
            spinner.style.display = 'none';
        });
});

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('togglePassword').addEventListener('click', function () {
        var passwordField = document.getElementById('password');
        var type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordField.setAttribute('type', type);
        this.textContent = type === 'password' ? '🙈' : '👁️';
    });

    // Evento de clic al botón "Volver"
    document.getElementById("backButton").addEventListener("click", function () {
        window.location.href = "../HTML/verificarEmail.html";
    });
});


// Función para enviar la solicitud POST
async function enviarSolicitudPOST() {
    const plan = localStorage.getItem('selectedPlan');
    // Convertir la cadena JSON a un objeto JavaScript
    const planObj = JSON.parse(plan);
    // Acceder al valor de 'id'
    const planId = planObj.id;

    const user = localStorage.getItem('userData');
    const userObj = JSON.parse(user);
    const usuarioId = userObj.userId;
    const prima = planObj.prima;
    const patente = localStorage.getItem('patente');
    const codChasis = localStorage.getItem('codChasis');
    const codMotor = localStorage.getItem('codMotor');
    const tieneGNC = localStorage.getItem('tieneGNC') === 'true'; // Convertir a booleano
    const usoParticular = true;
    const selectedVersionId = localStorage.getItem('selectedVersionId');

    const localidadId = localStorage.getItem('selectedLocalidadId');
    const altura = localStorage.getItem('altura');
    const calle = localStorage.getItem('direccion');

    const data = {
        planId: planId,
        usuarioId: usuarioId,
        prima: prima,
        bienAsegurado: {
          patente: patente,
          codChasis: codChasis,
          codMotor: codMotor,
          tieneGnc: tieneGNC,
          usoParticular: usoParticular,
          versionId: selectedVersionId,
          ubicacion: {
            provinciaId: 1,
            localidadId: localidadId,
            calle: calle,
            altura: altura
          }
        }
      };

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    await registrarPoliza(options);
}

async function registrarPoliza(options) {
    try {
        const response = await fetch('https://localhost:7136/api/Poliza/registrar', options);

        if (!response.ok) {
            throw new Error('Error al enviar la solicitud');
        }

        const responseData = await response.json();
        console.log('Solicitud POST enviada con éxito:', responseData);
    } catch (error) {
        console.error('Error al enviar la solicitud POST:', error);
    }

    // Redireccionar a la siguiente página
    window.location.href = "../HTML/codigoVerificacion.html";
}