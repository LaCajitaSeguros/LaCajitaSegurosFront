// Obtener elementos del DOM
const dropdownAnio = document.getElementById('dropdown-anio');
const dropdownMarca = document.getElementById('dropdown-marca');
const dropdownModelo = document.getElementById('dropdown-modelo');
const dropdownVersion = document.getElementById('dropdown-version');
const cotizarButton = document.getElementById('cotizar-button');
const dropdownLocalidad = document.getElementById('dropdown-localidad');
const fechaNacimientoInput = document.getElementById("fecha-nacimiento");
const tieneGNCInput = document.getElementById("tiene-gnc"); // Obtener el elemento del checkbox
let edadUsuario = null; // Variable para almacenar la edad del usuario
let tieneGNC = false; // Variable global para almacenar el estado del checkbox
const volverButton = document.getElementById('volver-button');

// Función para mostrar el spinner
function mostrarSpinner() {
    document.getElementById('overlay').style.display = 'block';
}

// Función para ocultar el spinner
function ocultarSpinner() {
    document.getElementById('overlay').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', function () {
    const apiMarcaUrl = 'https://localhost:7062/api/Marca';
    const apiLocalidadUrl = 'https://localhost:7062/api/Localidad';

    // Chequear si hay que deshabilitar o no el botón de cotizar. Si tiene todos los valores se habilita
    function checkDropdowns() {
        if (
            dropdownAnio.value &&
            dropdownMarca.value &&
            dropdownModelo.value &&
            dropdownVersion.value &&
            dropdownLocalidad.value &&
            fechaNacimientoInput.value &&
            edadUsuario >= 18 // Asegúrate de que el usuario sea mayor de 18 años
        ) {
            cotizarButton.disabled = false;
        } else {
            cotizarButton.disabled = true;
        }
    }

    // Completar el dropdown de año desde 2009 hasta 2024
    const startYear = 2009;
    const endYear = 2024;

    for (let year = endYear; year >= startYear; year--) {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        dropdownAnio.appendChild(option);
    }

    dropdownAnio.addEventListener('change', function () {
        actualizarLocalStorage();
        checkDropdowns();
    });

    // Request de marca
    fetch(apiMarcaUrl)
        .then(response => response.json())
        .then(data => {
            data.forEach(item => {
                const option = document.createElement('option');
                option.value = item.id;
                option.textContent = item.nombre;
                dropdownMarca.appendChild(option);
            });

            // Restaurar el valor de marca desde localStorage
            const savedMarcaId = localStorage.getItem('selectedMarcaId');
            if (savedMarcaId) {
                dropdownMarca.value = savedMarcaId;
                cargarModelos(savedMarcaId); // Cargar modelos asociados a la marca seleccionada
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });

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

            // Restaurar el valor de localidad desde localStorage
            const savedLocalidadId = localStorage.getItem('selectedLocalidadId');
            if (savedLocalidadId) {
                dropdownLocalidad.value = savedLocalidadId;
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });

    // Función para cargar modelos según la marca seleccionada
    function cargarModelos(marcaId) {
        const apiModeloUrl = `https://localhost:7062/api/Modelo/${marcaId}`;

        fetch(apiModeloUrl)
            .then(response => response.json())
            .then(data => {
                // Limpiar el dropdown de modelos y agregar la opción por defecto
                dropdownModelo.innerHTML = '<option value="" disabled selected>Buscar modelo</option>';
                dropdownVersion.innerHTML = '<option value="" disabled selected>Buscar versión</option>';

                data.forEach(item => {
                    const option = document.createElement('option');
                    option.value = item.id;
                    option.textContent = item.nombre;
                    dropdownModelo.appendChild(option);
                });

                // Restaurar el valor de modelo desde localStorage
                const savedModeloId = localStorage.getItem('selectedModeloId');
                if (savedModeloId && localStorage.getItem('selectedMarcaId') == marcaId) {
                    dropdownModelo.value = savedModeloId;
                    cargarVersiones(savedModeloId); // Cargar versiones asociadas al modelo seleccionado
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    // Función para cargar versiones según el modelo seleccionado
    function cargarVersiones(modeloId) {
        const apiVersionUrl = `https://localhost:7062/api/Version/${modeloId}`;

        fetch(apiVersionUrl)
            .then(response => response.json())
            .then(data => {
                // Limpiar el dropdown de versiones y agregar la opción por defecto
                dropdownVersion.innerHTML = '<option value="" disabled selected>Buscar versión</option>';

                data.forEach(item => {
                    const option = document.createElement('option');
                    option.value = item.id;
                    option.textContent = item.nombre;
                    dropdownVersion.appendChild(option);
                });

                // Restaurar el valor de versión desde localStorage
                const savedVersionId = localStorage.getItem('selectedVersionId');
                if (savedVersionId && localStorage.getItem('selectedModeloId') == modeloId) {
                    dropdownVersion.value = savedVersionId;
                }

                checkDropdowns();
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    // Función para verificar si el usuario tiene al menos 18 años
    function verificarEdad(fecha) {
        const hoy = new Date();
        const fechaNacimiento = new Date(fecha);
        let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
        const mes = hoy.getMonth() - fechaNacimiento.getMonth();

        if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
            edad--;
        }

        return edad;
    }

    // Agregamos un evento de cambio al input de fecha de nacimiento
    fechaNacimientoInput.addEventListener("change", function () {
        edadUsuario = verificarEdad(this.value); // Almacenamos la edad calculada en la variable

        // Si la edad es menor a 18, mostramos una alerta y vaciamos el campo de fecha
        if (edadUsuario < 18) {
            alert("Debes ser mayor de 18 años para continuar.");
            this.value = ""; // Vaciamos el campo de fecha
        }
        checkDropdowns();
    });

    // Función para establecer el valor predeterminado si el checkbox está vacío
    function establecerValorPredeterminado() {
        tieneGNC = tieneGNCInput.checked;
    }

    // Agregamos un evento de carga al cargar la página
    window.addEventListener("load", function () {
        establecerValorPredeterminado();

        // Restaurar valores desde localStorage
        const savedAnio = localStorage.getItem('selectedAnio');
        const savedFechaNacimiento = localStorage.getItem('fechaNacimiento');
        const savedTieneGNC = localStorage.getItem('tieneGNC');

        if (savedAnio) {
            dropdownAnio.value = savedAnio;
        }
        if (savedFechaNacimiento) {
            fechaNacimientoInput.value = savedFechaNacimiento;
            edadUsuario = verificarEdad(savedFechaNacimiento); // Calcular la edad del usuario
        }
        if (savedTieneGNC) {
            tieneGNCInput.checked = savedTieneGNC === 'true';
            tieneGNC = savedTieneGNC === 'true';
        }

        checkDropdowns();
    });

    // Agregamos un evento de cambio al checkbox
    tieneGNCInput.addEventListener("change", function () {
        tieneGNC = this.checked; // Actualizamos el valor de la variable global

        // Aquí puedes hacer lo que necesites con el valor del checkbox
        console.log("El valor de tieneGNC es:", tieneGNC);
        actualizarLocalStorage(); // Actualiza el almacenamiento local cuando cambia el checkbox
    });

    dropdownMarca.addEventListener('change', function () {
        const selectedMarcaId = dropdownMarca.value;
        // Restablecer los dropdowns de modelo y versión
        dropdownModelo.innerHTML = '<option value="" disabled selected>Buscar modelo</option>';
        dropdownVersion.innerHTML = '<option value="" disabled selected>Buscar versión</option>';
        cargarModelos(selectedMarcaId);
        actualizarLocalStorage();
    });

    dropdownModelo.addEventListener('change', function () {
        const selectedModeloId = dropdownModelo.value;
        // Restablecer el dropdown de versión
        dropdownVersion.innerHTML = '<option value="" disabled selected>Buscar versión</option>';
        cargarVersiones(selectedModeloId);
        actualizarLocalStorage();
    });

    dropdownVersion.addEventListener('change', function () {
        actualizarLocalStorage();
        checkDropdowns();
    });

    dropdownLocalidad.addEventListener('change', function () {
        const selectedLocalidad = dropdownLocalidad.options[dropdownLocalidad.selectedIndex].text;
        const selectedLocalidadId = dropdownLocalidad.value;
        localStorage.setItem('selectedLocalidad', selectedLocalidad);
        localStorage.setItem('selectedLocalidadId', selectedLocalidadId);
        actualizarLocalStorage();
        checkDropdowns();
    });

    // Chequear si todos los campos tienen valores
    dropdownAnio.addEventListener('change', checkDropdowns);
    dropdownMarca.addEventListener('change', checkDropdowns);
    dropdownModelo.addEventListener('change', checkDropdowns);
    dropdownVersion.addEventListener('change', checkDropdowns);
    dropdownLocalidad.addEventListener('change', checkDropdowns);
});

// Enviar al usuario a la siguiente página
cotizarButton.addEventListener('click', function () {
    enviarSolicitudPOST();
});

// Asegúrate de tener el ID correcto y no guiones bajos
volverButton.addEventListener('click', function () {
    window.location.href = '../HTML/index.html';
});

// Función para actualizar el almacenamiento local con los valores seleccionados
function actualizarLocalStorage() {
    localStorage.setItem('selectedMarcaId', dropdownMarca.value);
    localStorage.setItem('selectedModeloId', dropdownModelo.value);
    localStorage.setItem('selectedVersionId', dropdownVersion.value);
    localStorage.setItem('selectedAnio', dropdownAnio.value);
    localStorage.setItem('fechaNacimiento', fechaNacimientoInput.value);
    localStorage.setItem('tieneGNC', tieneGNC.toString()); // Guardar como cadena "true" o "false"
}

// Función para enviar la solicitud POST
function enviarSolicitudPOST() {
    mostrarSpinner(); // Mostrar spinner antes de la solicitud POST

    const localidad = localStorage.getItem('selectedLocalidad');
    const localidadId = localStorage.getItem('selectedLocalidadId');
    const edad = edadUsuario;
    const selectedAnio = localStorage.getItem('selectedAnio');
    const selectedMarcaId = localStorage.getItem('selectedMarcaId');
    const selectedModeloId = localStorage.getItem('selectedModeloId');
    const selectedVersionId = localStorage.getItem('selectedVersionId');
    const tieneGNC = localStorage.getItem('tieneGNC') === 'true'; // Convertir a booleano

    const marcaNombre = dropdownMarca.options[dropdownMarca.selectedIndex].text;
    const modeloNombre = dropdownModelo.options[dropdownModelo.selectedIndex].text;
    const versionNombre = dropdownVersion.options[dropdownVersion.selectedIndex].text;

    const data = {
        localidad: localidad,
        edad: edad,
        automovil: {
            anioVehiculo: selectedAnio,
            marcaId: selectedMarcaId,
            modeloId: selectedModeloId,
            versionId: selectedVersionId,
            gnc: tieneGNC
        }
    };

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    fetch('https://localhost:7062/api/Vehiculo', options)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al enviar la solicitud');
            }
            return response.json();
        })
        .then(responseData => {
            console.log('Solicitud POST enviada con éxito:', responseData);
            const datosAuto = {
                marca: marcaNombre,
                modelo: modeloNombre,
                version: versionNombre,
                prima: responseData
            };

            const ubicacion = {
                localidadId: localidadId,
                provinciaId: 1 // ProvinciaId constante
            };

            const jsonResponse = {
                datosAuto: datosAuto,
                ubicacion: ubicacion
            };

            localStorage.setItem('jsonResponse', JSON.stringify(jsonResponse));

            ocultarSpinner(); // Ocultar spinner después de recibir respuesta

            window.location.href = '../HTML/PlanesCotizados.html'; // Redirigir a la siguiente página
        })
        .catch(error => {
            console.error('Error al enviar la solicitud POST:', error);
            ocultarSpinner(); // Asegurarse de ocultar el spinner en caso de error
        });
}

dropdownMarca.addEventListener('change', function () {
    const selectedMarcaId = dropdownMarca.value;
    // Restablecer los dropdowns de modelo y versión
    dropdownModelo.innerHTML = '<option value="" disabled selected>Buscar modelo</option>';
    dropdownVersion.innerHTML = '<option value="" disabled selected>Buscar versión</option>';
    cargarModelos(selectedMarcaId);
    actualizarLocalStorage();
});

dropdownModelo.addEventListener('change', function () {
    const selectedModeloId = dropdownModelo.value;
    // Restablecer el dropdown de versión
    dropdownVersion.innerHTML = '<option value="" disabled selected>Buscar versión</option>';
    cargarVersiones(selectedModeloId);
    actualizarLocalStorage();
});
