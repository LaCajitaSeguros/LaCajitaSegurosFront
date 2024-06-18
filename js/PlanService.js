import { ResultService } from './ResultService.js';


export function ObtenerPlanesCotizados(cotizacion) {
    return fetch(`https://localhost:7272/api/Planes/PlanesCotizados?Cotizacion=${cotizacion}`)
        .then(response => {
            if (!response.ok) {
                return response.text().then(errorMessage => {
                    return new ResultService(response.status, true, "Error: " + errorMessage);
                });
            }
            return response.json().then(data => {
                if (data.length === 0) {
                    return new ResultService(response.status, false, "No hay resultado para su busqueda", data);

                }
                return new ResultService(response.status, false, null, data);
            });
        })
        .catch(error => {
            console.error('Error:', error);
            return new ResultService(null, true, "Error de red: No se pudo establecer una conexión con el servidor", null);
        });
}