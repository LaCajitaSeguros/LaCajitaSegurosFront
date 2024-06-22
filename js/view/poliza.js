import Poliza from "../componets/polizaComponet.js";
import Siniestro from "../componets/siniestroComponet.js";
import ApiPolizasYSiniestros from "../services/polizasYSiniestrosService.js";

let accordionPoliza = document.getElementById("accordionPoliza");
let accordionSiniestro = document.getElementById("accordionSiniestro");

let siniestrosData = [];
console.log(accordionPoliza);

const render = async () => {
  //Aca deberia de obtener el usuarioID desde el LocalStorage
  const user = localStorage.getItem('userData');
  const userObj = JSON.parse(user);
  const usuarioId = userObj.userId; 
  let polizasData = await ApiPolizasYSiniestros.GetPolizasAndSiniestrosByUserId(usuarioId);

  polizasData.forEach((polizaData) => {
    console.log("poliza");
    console.log(polizaData);
    console.log(polizaData.numeroDePoliza); 
    polizaData.siniestros.forEach(siniestro =>{
        siniestro.numeroDePoliza = polizaData.numeroDePoliza;
        siniestro.modelo = polizaData.bienAsegurado.version.nombreVersion;
        siniestrosData.push(siniestro);
    }); 
   
    accordionPoliza.innerHTML += Poliza(polizaData);
  });

  //Aca voy a recorrer el array de siniestros y renderizarlos en el front
  console.log("Siniestros:" );
  console.log(siniestrosData);

  siniestrosData.forEach((siniestroData) => {
    accordionSiniestro.innerHTML += Siniestro(siniestroData);
  });
};

window.onload = render;