document.addEventListener('DOMContentLoaded', () => {
    // Recuperar el array de objetos desde el localStorage
    let vehiculosDisponibles = JSON.parse(localStorage.getItem('vehiculosDisponibles'));
    console.log("poliza");
    console.log(vehiculosDisponibles);

    let optionsHTML = '';   

    vehiculosDisponibles.forEach((vehiculo) => {
        let vehiculoInfo =  `${vehiculo.version.marca} - ${vehiculo.version.modelo} - ${vehiculo.version.nombreVersion} - Patente: ${vehiculo.patente}`
        optionsHTML += `<option value="${vehiculo.numeroDePoliza}">${vehiculoInfo}</option>`;
    });
    // Agregar las opciones al select
    document.getElementById('vehicle-select').innerHTML += optionsHTML;

    // Manejar el evento de clic en las tarjetas de incidentes
    const incidentCards = document.querySelectorAll('.incident-card');
    incidentCards.forEach(card => {
        card.addEventListener('click', () => {
            incidentCards.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
        });
    });

    // Asignar la función registrarSiniestro al evento submit del formulario
    document.getElementById('siniestro-form').addEventListener('submit', (event) => {
        event.preventDefault();
        registrarSiniestro();
    });
});

//Logica para listar las localidades
const dropdownLocalidad = document.getElementById('dropdown-localidad');
const apiLocalidadUrl = 'https://localhost:7062/api/Localidad';


// Request de localidad
fetch(apiLocalidadUrl)
    .then(response => response.json())
    .then(data => {
        // Ordenar alfabéticamente las localidades
        data.sort((a, b) => a.nombre.localeCompare(b.nombre));

        // Iterar sobre las localidades ordenadas
        data.forEach(item => {
            const option = document.createElement('option');
            option.value = item.localidadId;
            option.textContent = item.nombre;
            dropdownLocalidad.appendChild(option);
        });
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });


function registrarSiniestro() {
    const vehiculoSeleccionado = document.getElementById('vehicle-select').value;
    const tipoSiniestroSeleccionado = document.querySelector('.incident-card.selected') ? document.querySelector('.incident-card.selected').textContent.trim() : '';
    const observacion = document.getElementById('additional-details').value;
    const provinciaSeleccionada = document.getElementById('provincia').value;
    const localidadSeleccionada = document.getElementById('Localidad').value;
    const calle = document.getElementById('calle').value;
    const altura = document.getElementById('altura').value;
    const fecha = document.getElementById('incident-date').value;
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
    //const usuarioId = userObj.userId;  // Descomentar y usar si está disponible en el objeto userObj

    const data = {
        usuarioId: 'user3', // Cambiar por `usuarioId` si se obtiene del userObj
        siniestro: {
            fecha: fecha,
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

// Asignar la función registrarSiniestro a window para que sea accesible desde el HTML
window.registrarSiniestro = registrarSiniestro;
