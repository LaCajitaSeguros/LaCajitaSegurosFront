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
            const userId = data.userId;
            emailError.style.display = 'block';
            document.getElementById('EmailAddress').classList.add('errorEmail');
            emailError.textContent = 'El correo ya está registrado.';
            // Redirigir a login.html después de 2 segundos
            setTimeout(() => {
                enviarSolicitudPOST(userId);
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


// Función para enviar la solicitud POST
async function enviarSolicitudPOST(userId) {
    const plan = localStorage.getItem('selectedPlan');
    // Convertir la cadena JSON a un objeto JavaScript
    const planObj = JSON.parse(plan);
    // Acceder al valor de 'id'
    const planId = planObj.id;

    const usuarioId = userId;
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
    window.location.href = "../HTML/login.html";
}