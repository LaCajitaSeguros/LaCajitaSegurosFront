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

    const user = localStorage.getItem('lastUserId');
    const usuarioId = JSON.parse(user);
    //const usuarioId = "user2"; // suponiendo que este valor ya está disponible
    const nroDePoliza = document.getElementById("vehicle-select").value;
    const fecha = document.getElementById("incident-date").value;
    const tiposDeSiniestros = [];
    const incidentCards = document.querySelectorAll(".incident-card");
    incidentCards.forEach((card) => {
        if (card.classList.contains("selected")) {
            tiposDeSiniestros.push({ tipoSiniestroId: parseInt(card.id) });
        }
    });
    const observacion = document.getElementById("additional-details").value;
    const provinciaId = document.getElementById("provincia").value;
    const localidadId = document.getElementById("dropdown-localidad").value;
    const calle = document.getElementById("calle").value;
    const altura = document.getElementById("altura").value;
    const tieneTercerosInvolucrados = document.querySelector('input[name="emergency"][value="si"]').checked;
    
    const imagenes = [];
    const imageInput = document.getElementById("incident-image");
    if (imageInput.files.length > 0) {
      imagenes.push({ urlImagen: imageInput.files[0].name });
    }

    console.log(usuarioId); // Output: "user1"
    console.log(nroDePoliza); // Output: "635729274"
    console.log(fecha); // Output: "2024-06-20"
    console.log(tiposDeSiniestros); // Output: [{ tipoSiniestroId: 1 }, { tipoSiniestroId: 2 }, { tipoSiniestroId: 4 }]
    console.log(incidentCards); // Output: NodeList(6) [div.incident-card, div.incident-card, div.incident-card, div.incident-card, div.incident-card, div.incident-card]
    console.log(observacion); // Output: "Esto es una observacion"
    console.log(provinciaId); // Output: "1"
    console.log(localidadId); // Output: "6"
    console.log(calle); // Output: "calleDelsiniestroNuevo"
    console.log(altura); // Output: "145"
    console.log(imagenes[0]); // Output: [{ urlImagen: "https://example.com/image1.jpg" }]
    console.log(tieneTercerosInvolucrados); // Output: false

    const siniestro = {
        fecha,
        tiposDeSiniestros,
        observacion,
        ubicacion: {
            provinciaId,
            localidadId,
            calle,
            altura,
        },
        imagenes,
        tieneTercerosInvolucrados,
    };

    const data = {
        usuarioId,
        nroDePoliza,
        siniestro,
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
        Swal.fire({
            icon: 'success',
            title: '¡Siniestro registrado con éxito!',
            showConfirmButton: true,
            confirmButtonText: 'Continuar',
            confirmButtonColor:'#041B2D',
            allowOutsideClick: false,
        }).then((result) => {
            if (result.isConfirmed) {
                // Redireccionar a la siguiente página
                window.location.href = "../HTML/polizasYSiniestros.html";
            }
        });
        
    } catch (error) {
        console.error('Error al enviar la solicitud POST:', error);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Hubo un error al registrar el siniestro. Por favor, intenta nuevamente.'
        });
    }
   
}

// Asignar la función registrarSiniestro a window para que sea accesible desde el HTML
window.registrarSiniestro = registrarSiniestro;
