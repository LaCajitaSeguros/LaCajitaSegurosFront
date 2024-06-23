import Poliza from "../componets/polizaComponet.js";
import Siniestro from "../componets/siniestroComponet.js";
import ApiPolizasYSiniestros from "../services/polizasYSiniestrosService.js";

let accordionPoliza = document.getElementById("accordionPoliza");
let accordionSiniestro = document.getElementById("accordionSiniestro");

let siniestrosData = [];
console.log(accordionPoliza);

const render = async () => {
  //Aca deberia de obtener el usuarioID desde el LocalStorage
  const userId = localStorage.getItem('lastUserId');
  const cleanUserId = userId.replace(/^"|"$/g, '');
  let polizasData = await ApiPolizasYSiniestros.GetPolizasAndSiniestrosByUserId(cleanUserId);

  polizasData.forEach((polizaData) => {
    console.log("poliza");
    console.log(polizaData);
    console.log(polizaData.numeroDePoliza);
    polizaData.siniestros.forEach(siniestro => {
      siniestro.numeroDePoliza = polizaData.numeroDePoliza;
      siniestro.modelo = polizaData.bienAsegurado.version.nombreVersion;
      siniestrosData.push(siniestro);
    });
    accordionPoliza.innerHTML += Poliza(polizaData);
  });
  LoadEventClickImage();
  LoadEventClickOutsideImage();
  //Aca voy a recorrer el array de siniestros y renderizarlos en el front
  console.log("Siniestros:");
  console.log(siniestrosData);

  siniestrosData.forEach((siniestroData) => {
    accordionSiniestro.innerHTML += Siniestro(siniestroData);
  });
};

window.onload = render;

function LoadEventClickImage() {
  let images = document.getElementsByClassName("imagenes__Siniestro__Container__img");
  for (var i = 0; i < images.length; i++) {
    const image = images[i]; // Guardamos una referencia al producto actual en esta iteración

    images[i].addEventListener("click", function () {
      OpenImage(image);
    });

    // Añadir event listener para clics fuera de la imagen expandida
    document.addEventListener("click", function () {
      CloseImage(image);
    });
  }


}

function OpenImage(image) {
  image.classList.add('imagenes__Siniestro__Container__img__expandida');
}

function CloseImage(image) {
  if (!event.target.closest('.imagenes__Siniestro__Container__img')) {
    // Iterar nuevamente sobre las imágenes para quitar la clase expandida
    image.classList.remove('imagenes__Siniestro__Container__img__expandida');
  }
}

