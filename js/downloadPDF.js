document.querySelectorAll('.downloadPDF').forEach(button => {
    button.addEventListener('click', (event) => {
        const accordionBody = event.target.closest('.content-polizas');

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
