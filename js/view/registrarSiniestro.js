// Recuperar el array de objetos desde el localStorage
let polizasArray = JSON.parse(localStorage.getItem('polizasArray'));
console.log("poliza");
console.log(polizasArray);

// Crear un fragmento de HTML para los opciones del select
let optionsHTML = '';

polizasArray.forEach((poliza) => {
  optionsHTML += `<option value="${poliza.nroDePoliza}">${poliza.versionAuto}</option>`;
});

// Agregar las opciones al select
document.getElementById('vehiculos').innerHTML += optionsHTML;

function registrarSiniestro() {
    const vehiculoSeleccionado = document.getElementById('vehiculos').value;
    const tipoSiniestroSeleccionado = document.getElementById('Siniestros').value;
    const observacion = document.getElementById('Comentario').value;
    const provinciaSeleccionada = document.getElementById('provincia').value;
    const localidadSeleccionada = document.getElementById('Localidad').value;
    const calle = document.getElementById('calle').value;
    const altura = document.getElementById('altura').value;
    const fecha = document.getElementById('fecha');
    const imagenInput = document.querySelector('input[type="file"]');

    console.log('vehiculoSeleccionado:', vehiculoSeleccionado);
    console.log('tipoSiniestroSeleccionado:', tipoSiniestroSeleccionado);
    console.log('observacion:', observacion);
    console.log('provinciaSeleccionada:', provinciaSeleccionada);
    console.log('localidadSeleccionada:', localidadSeleccionada);
    console.log('calle:', calle);
    console.log('altura:', altura);
    console.log('fecha:', fecha);
    console.log('imagenInput:', imagenInput.files); // Para obtener los archivos seleccionados, si los hay
    
    const user = localStorage.getItem('userData');
    const userObj = JSON.parse(user);
    //const usuarioId = userObj.userId;  //ahi que descomentarlo he incorporarlo en el usuarioId de la request
    
    const data = {
        usuarioId: 'user3', 
        siniestro: {
            fecha:fecha, 
            tiposDeSiniestros: [{ tipoSiniestroId: parseInt(tipoSiniestroSeleccionado) }],
            observacion: observacion,
            ubicacion: {
                provinciaId: parseInt(provinciaSeleccionada),
                localidadId: parseInt(localidadSeleccionada),
                calle: calle,
                altura: parseInt(altura)
            },
            imagenes: [],
            tercerosInvolucrados: [] 
        }
    };

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    enviarSolicitudPOST(options);
}

async function enviarSolicitudPOST(options) {
    try {
        const response = await fetch('https://localhost:7136/api/Siniestro/registrar', options);

        if (!response.ok) {
            throw new Error('Error al enviar la solicitud');
        }
        const responseData = await response.json();
        console.log('Solicitud POST enviada con éxito:', responseData);
    } catch (error) {
        console.error('Error al enviar la solicitud POST:', error);
    }

    // Redireccionar a la siguiente página
    window.location.href = "../HTML/polizasYSiniestros.html";
}


window.registrarSiniestro = registrarSiniestro;

export { registrarSiniestro };
