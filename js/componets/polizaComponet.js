export default function Poliza(polizaData){

    const fechaInicio = `${polizaData.fechaInicio.split('T')[0].split('-').reverse().join('/')}`
    const fechaFin = `${polizaData.fechaVencimiento.split('T')[0].split('-').reverse().join('/')}`


    
    console.log(polizaData.fechaInicio);

    return `
       <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${polizaData.numeroDePoliza}" aria-expanded="false" aria-controls="collapseOne">
                          <div class="poliza-header-content">
                            <p>${polizaData.numeroDePoliza}</p>
                            <p>${polizaData.plan.nombre}</p>
                            <p>$${polizaData.prima}</p>
                            <p>${fechaInicio}-${fechaFin}</p>
                            <p>${polizaData.bienAsegurado.version.nombreVersion}</p>
                          </div>
                        </button>
                      
                    </h2>
                    <div id="collapse${polizaData.numeroDePoliza}" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                      <div class="accordion-body">

                        <div class="bien-asegurado">
                          <h5>Bien asegurado</h5>
                          <ul>
                            <li><strong>Marca:</strong> ${polizaData.bienAsegurado.version.marca}</li>
                            <li><strong>Modelo:</strong> ${polizaData.bienAsegurado.version.modelo}</li>
                            <li><strong>Versión:</strong> ${polizaData.bienAsegurado.version.nombreVersion}</li>
                            <li><strong>Patente:</strong> ${polizaData.bienAsegurado.patente}</li>
                            <li><strong>Código de chasis:</strong> ${polizaData.bienAsegurado.codChasis}</li>
                            <li><strong>Código de motor:</strong> ${polizaData.bienAsegurado.codMotor}</li>
                            <li><strong>Tiene GNC:</strong> ${polizaData.bienAsegurado.tieneGnc}</li>
                            <li><strong>Uso particular:</strong> ${polizaData.bienAsegurado.usoParticular}</li>
                            <li><strong>Ubicación:</strong>
                              <ul>
                                <li><strong>Provincia:</strong> ${polizaData.bienAsegurado.ubicacion.provincia}</li>
                                <li><strong>Localidad:</strong> ${polizaData.bienAsegurado.ubicacion.localidad}</li>
                                <li><strong>Calle:</strong> ${polizaData.bienAsegurado.ubicacion.calle}</li>
                                <li><strong>Altura:</strong> ${polizaData.bienAsegurado.ubicacion.altura}</li>
                              </ul>
                            </li>
                          </ul>
                        </div>
                        <div class="coberturas">
                          <h5>Coberturas</h5>
                          <ul>
                          ${polizaData.plan.coberturas.map((cobertura) => {
                            return `<li>${cobertura.descripcion}</li>`;
                          }).join('')}
                          </ul>
                        </div>

                      </div>
                    </div>
                </div>
`    
}
