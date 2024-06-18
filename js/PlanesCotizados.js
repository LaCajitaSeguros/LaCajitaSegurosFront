import { ObtenerPlanesCotizados } from './PlanService.js';
import { ImprimirPlanes } from './ImprimirPlanes.js';


document.addEventListener("DOMContentLoaded", async function () {
    await LoadPlanesCotizados();
});

async function LoadPlanesCotizados() {
    let cotizacion = 15333;

    let result = await ObtenerPlanesCotizados(cotizacion);

    //MostrarEstadoSolicitud(result);

    if (result.Error === false) {
        ImprimirPlanes(result.Data);
    }
}