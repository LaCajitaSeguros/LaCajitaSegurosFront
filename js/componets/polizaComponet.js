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
                          <p>${fechaInicio} - ${fechaFin}</p>
                          <p>${polizaData.bienAsegurado.version.nombreVersion}</p>
                        </div>
                      </button>
                    
                  </h2>
                  <div id="collapse${polizaData.numeroDePoliza}" class="accordion-collapse collapse" data-bs-parent="#accordionPoliza">
                    <div class="accordion-body">

                      <div class="bien-asegurado">
                        <h5>Bien asegurado</h5>
                        <ul class="bien-asegurado__listado">
                          <li class="bien-asegurado__listado__item"><strong class="bien-asegurado__listado__item__strong">Marca:</strong>${polizaData.bienAsegurado.version.marca}</li>
                          <li class="bien-asegurado__listado__item"><strong class="bien-asegurado__listado__item__strong">Modelo:</strong> ${polizaData.bienAsegurado.version.modelo}</li>
                          <li class="bien-asegurado__listado__item"><strong class="bien-asegurado__listado__item__strong">Versión:</strong> ${polizaData.bienAsegurado.version.nombreVersion}</li>
                          <li class="bien-asegurado__listado__item"><strong class="bien-asegurado__listado__item__strong">Patente:</strong> ${polizaData.bienAsegurado.patente}</li>
                          <li class="bien-asegurado__listado__item"><strong class="bien-asegurado__listado__item__strong">Código de chasis:</strong> ${polizaData.bienAsegurado.codChasis}</li>
                          <li class="bien-asegurado__listado__item"><strong class="bien-asegurado__listado__item__strong">Código de motor:</strong>${polizaData.bienAsegurado.codMotor}</li>
                          <li class="bien-asegurado__listado__item"><strong class="bien-asegurado__listado__item__strong">Tiene GNC:</strong>${[polizaData.bienAsegurado.tieneGnc ? 'Sí' : 'No']}</li>
                          <li class="bien-asegurado__listado__item"><strong class="bien-asegurado__listado__item__strong">Uso particular:</strong>${[polizaData.bienAsegurado.usoParticular ? 'Sí' : 'No']}</li>
                        </ul>
                      </div>
                      <div class="bien-asegurado">
                        <h5>Ubicacion</h5>
                        <ul class="bien-asegurado__listado">
                          <li class="bien-asegurado__listado__item" ><strong class="bien-asegurado__listado__item__strong">Provincia:</strong> ${polizaData.bienAsegurado.ubicacion.provincia}</li>
                          <li class="bien-asegurado__listado__item"><strong class="bien-asegurado__listado__item__strong">Localidad:</strong>${polizaData.bienAsegurado.ubicacion.localidad}</li>
                          <li class="bien-asegurado__listado__item"><strong class="bien-asegurado__listado__item__strong">Calle:</strong> ${polizaData.bienAsegurado.ubicacion.calle}</li>
                          <li class="bien-asegurado__listado__item"><strong class="bien-asegurado__listado__item__strong">Altura:</strong>${polizaData.bienAsegurado.ubicacion.altura}</li>
                        </ul>
                      </li>
                      </div>
                      <div class="coberturas">
                        <h5>Coberturas</h5>
                        <ul class="coberturas__listado">
                          ${polizaData.plan.coberturas.map((cobertura) => {
                              return `<li class="coberturas__listado__item">${cobertura.descripcion}</li>`;
                          }).join('')}
                        </ul>
                      </div>
                <button class="downloadPDF btn btn-primary">
               <span class="spinner-border spinner-border-sm d-none" role="status" aria-hidden="true"></span>
               <i class="far fa-file-pdf"></i> Descargar como PDF
             </button>
                    </div>
                  </div>
              </div>
`    
}
