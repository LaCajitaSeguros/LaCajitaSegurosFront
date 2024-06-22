import Poliza from "../componets/polizaComponet.js";
import ApiPolizasYSiniestros from "../services/polizasYSiniestrosService.js";

let accordion = document.getElementById("accordionExample");
console.log(accordion);

const render = async () => {
  //Aca deberia de obtener el usuarioID desde el LocalStorage
  let polizasData = await ApiPolizasYSiniestros.GetPolizasAndSiniestrosByUserId("user3");
  polizasData.forEach((polizaData) => {
    accordion.innerHTML += Poliza(polizaData);
  });
};

window.onload = render;