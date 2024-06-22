export default function Siniestro(siniestroData){

    const fecha = `${siniestroData.fecha.split('T')[0].split('-').reverse().join('/')}`


    return `
         <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${siniestroData.siniestroId}" aria-expanded="false" aria-controls="collapseOne">
                          <div class="poliza-header-content">
                            <p>${siniestroData.siniestroId}</p>
                            <p>${siniestroData.numeroDePoliza}</p>
                            <p>${siniestroData.modelo}</p>
                            <p>${fecha}</p>
                            <p>${siniestroData.ubicacion.provincia}/${siniestroData.ubicacion.localidad}</p>
                            <p>${[siniestroData.tercerosInvolucrados.length > 0 ? 'Sí' : 'No']}</p>
                            <p>Pendiente a revición</p>
                          </div>
                        </button>
                    </h2>
                    <div id="collapse${siniestroData.siniestroId}"  class="accordion-collapse collapse" data-bs-parent="#accordionSiniestro">
                      <div class="accordion-body">
                        <h5>Información del Siniestro</h5>
                        <ul>
                          <li><strong>Fecha:</strong> 2024-06-20T00:00:00</li>
                          <li><strong>Tipo de Siniestro:</strong>
                            <ul>
                             ${siniestroData.tipoDeSiniestros.map(tipo => `<li>${tipo.nombre}</li>`).join('')}
                            </ul>
                          </li>
                        </ul>
                      
                        <div class="imagenes">
                          <h5>Imágenes del Siniestro</h5>
                          <ul>
                             ${siniestroData.imagenes.map(imagen => `<li><a href="${imagen.urlImagen}" target="_blank">${imagen.urlImagen}</a></li>`).join('')}
                          </ul>
                        </div>
                      
                        <div class="ubicacion">
                          <h5>Ubicación del Siniestro</h5>
                          <ul>
                            <li><strong>Provincia:</strong> ${siniestroData.ubicacion.provincia}</li>
                            <li><strong>Localidad:</strong> ${siniestroData.ubicacion.localidad}</li>
                            <li><strong>Calle:</strong> ${siniestroData.ubicacion.calle}</li>
                            <li><strong>Altura:</strong> ${siniestroData.ubicacion.altura}</li>
                          </ul>
                        </div>
                      
                        <div class="terceros-involucrados">
                          <h5>Terceros Involucrados</h5>
                          <ul>
                          ${siniestroData.tercerosInvolucrados.map(tercero => `
                            <li>
                              <strong>Nombre:</strong> ${tercero.nombre}<br>
                              <strong>Compañía de Seguro:</strong> ${tercero.companiaDeSeguro}<br>
                              <strong>Patente:</strong> ${tercero.patente}<br>
                              <strong>Ubicación:</strong>
                              <ul>
                                <li><strong>Provincia:</strong> ${tercero.ubicacion.provincia}</li>
                                <li><strong>Localidad:</strong> ${tercero.ubicacion.localidad}</li>
                                <li><strong>Calle:</strong> ${tercero.ubicacion.calle}</li>
                                <li><strong>Altura:</strong> ${tercero.ubicacion.altura}</li>
                              </ul>
                            </li>
                          `).join('')}
                          </ul>
                        </div>
                      </div>

                    </div>
                </div>
  
`    
}