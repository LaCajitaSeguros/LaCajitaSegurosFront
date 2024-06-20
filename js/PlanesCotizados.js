import { ObtenerPlanesCotizados } from './PlanService.js';
import { ImprimirPlanes } from './ImprimirPlanes.js';


document.addEventListener("DOMContentLoaded", async function () {
    MostrarSpinner();
    await LoadPlanesCotizados();
    OcultarSpinner();
});

async function LoadPlanesCotizados() {
    let auto = ObtenerDatosAuto();
    let result = await ObtenerPlanesCotizados(auto.prima);

    if (result.Error === false) {
        ImprimirModelo(auto);
        ImprimirPlanes(result.Data);
    }
}

function ObtenerDatosAuto() {
    let jsonResponse = JSON.parse(localStorage.getItem('jsonResponse'));
    return jsonResponse.datosAuto;
}

function ImprimirModelo(auto) {
    let modelo = document.getElementById("Titulos__Modelo__Modelo");
    modelo.innerHTML += ConstruirModelo(auto);
}

function ConstruirModelo(auto) {
    let modelo = `${auto.marca} ${auto.modelo} ${auto.version}`;
    return modelo;
}

function MostrarSpinner() {
    document.getElementById('overlay').style.display = 'block';
}

// Función para ocultar el spinner
function OcultarSpinner() {
    document.getElementById('overlay').style.display = 'none';
}