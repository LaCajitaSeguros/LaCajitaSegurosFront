export default function Siniestro(siniestroData) {

  const fecha = `${siniestroData.fecha.split('T')[0].split('-').reverse().join('/')}`


  return `
    <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${siniestroData.siniestroId}" aria-expanded="false" aria-controls="collapseDos">
                          <div class="poliza-header-content">
                           <p>${siniestroData.siniestroId}</p>
                            <p>${siniestroData.numeroDePoliza}</p>
                            <p>${siniestroData.modelo}</p>
                            <p>${fecha}</p>
                            <p>${siniestroData.ubicacion.provincia}/${siniestroData.ubicacion.localidad}</p>
                            <p>${siniestroData.tieneTercerosInvolucrados ? 'Sí' : 'No'}</p>
                            <p>Pendiente a revisión</p>
                          </div>
                        </button>
                    </h2>
                    <div id="collapse${siniestroData.siniestroId}" class="accordion-collapse collapse" data-bs-parent="#accordionSiniestro">
                      <div class="accordion-body">
                        <h5>Tipo de Siniestro</h5>
                        <ul class="coberturas__listado">
                           ${siniestroData.tipoDeSiniestros.map(tipo => `<li class="coberturas__listado__item">${tipo.nombre}</li>`).join('')}
                        </ul>

                        <h5>Detalle</h5>
                        <p>${siniestroData.observacion}</p>

                        <div class="imagenes">
                          <h5>Imágenes del Siniestro</h5>
                          <div class="imagenes__Siniestro">
                            <div class="imagenes__Siniestro__Container">
                              ${siniestroData.imagenes.map(imagen => `<img class="imagenes__Siniestro__Container__img" src="../img/${imagen.urlImagen}" alt="">`).join('')}
                              <div class="overlay"></div> <!-- Nuevo div para el overlay -->
                            </div>
                          </div>
                        </div>

                        <div class="ubicacion">
                          <h5>Ubicación del Siniestro</h5>
                          <ul class="bien-asegurado__listado">
                            <li class="bien-asegurado__listado__item"><strong class="bien-asegurado__listado__item__strong">Provincia:</strong>${siniestroData.ubicacion.provincia}</li>
                            <li class="bien-asegurado__listado__item"><strong class="bien-asegurado__listado__item__strong">Localidad:</strong>${siniestroData.ubicacion.localidad}</li>
                            <li class="bien-asegurado__listado__item"><strong class="bien-asegurado__listado__item__strong">Calle:</strong> ${siniestroData.ubicacion.calle}</li>
                            <li class="bien-asegurado__listado__item"><strong class="bien-asegurado__listado__item__strong">Altura:</strong>${siniestroData.ubicacion.altura}</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                </div>
  
`
}