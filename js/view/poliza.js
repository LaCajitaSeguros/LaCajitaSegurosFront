import Siniestro from "../componets/siniestroComponet.js";
import ApiPolizasYSiniestros from "../services/polizasYSiniestrosService.js";
import Poliza from "../componets/polizaComponet.js";

let accordionPoliza = document.getElementById("accordionPoliza");
let accordionSiniestro = document.getElementById("accordionSiniestro");
let mostrarTitulo = document.querySelector(".mostrar-titulo");

let siniestrosData = [];
let vehiculos = [];
console.log(accordionPoliza);


document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('button-registrarSiniestro').addEventListener('click', function() {
      window.location.href = 'registrarSiniestro.html';
  });
});

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
    const vehiculosSeleccionado = {
      numeroDePoliza: polizaData.numeroDePoliza,
      version: polizaData.bienAsegurado.version,
      patente: polizaData.bienAsegurado.patente,
    };
    vehiculos.push(vehiculosSeleccionado);
  });
  localStorage.setItem('vehiculosDisponibles', JSON.stringify(vehiculos));
  //Aca voy a recorrer el array de siniestros y renderizarlos en el front
  console.log("Siniestros:");
  console.log(siniestrosData);

  
  if(siniestrosData.length === 0){
    mostrarTitulo.style.display="none";
    accordionSiniestro.innerHTML = '<p class="accordion-item no-siniestros">No hay siniestros registrados.</p>';
  } else{
    mostrarTitulo.style.display="flex";
    siniestrosData.forEach((siniestroData) => {
      accordionSiniestro.innerHTML += Siniestro(siniestroData);
    });
    LoadEventClickImage();
    DownloadPdf();
  }
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



function DownloadPdf() {
  document.querySelectorAll('.downloadPDF').forEach(button => {
    button.addEventListener('click', (event) => {
      const accordionBody = event.target.closest('.accordion-item');

      // Ocultar el botón de descarga temporalmente antes de capturar el contenido
      button.style.display = 'none';

      html2canvas(accordionBody, {
        scale: 2 // Aumenta la escala para mejorar la calidad de la imagen
      }).then(canvas => {
        // Restaurar la visibilidad del botón después de capturar el contenido
        button.style.display = 'block';

        const imgData = canvas.toDataURL('image/jpeg', 1.0); // Utiliza JPEG para mejor calidad
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF('p', 'px', [window.innerWidth, window.innerHeight]); // Tamaño completo de la ventana

        const imgProps = doc.getImageProperties(imgData);
        const pdfWidth = doc.internal.pageSize.getWidth();
        const pdfHeight = doc.internal.pageSize.getHeight();
        const ratio = imgProps.height / imgProps.width;

        // Calcula el tamaño para ajustar la imagen al PDF
        let imgWidth = pdfWidth;
        let imgHeight = pdfWidth * ratio;

        // Ajusta si la altura calculada supera el alto de la página PDF
        if (imgHeight > pdfHeight) {
          imgHeight = pdfHeight;
          imgWidth = imgHeight / ratio;
        }

        const imgX = (pdfWidth - imgWidth) / 2 + 50; // Centra horizontalmente con un desplazamiento de 50 px hacia la derecha
        const imgY = 20; // Posición arriba de todo, ajusta según necesites

        doc.addImage(imgData, 'JPEG', imgX, imgY, imgWidth, imgHeight);
        doc.save('poliza.pdf');
      });
    });
  });

}