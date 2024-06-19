document.addEventListener('DOMContentLoaded', function () {
    const patenteInput = document.getElementById('patente');
    const chasisInput = document.getElementById('chasis');
    const motorInput = document.getElementById('motor');
    const direccionInput = document.getElementById('direccion');
    const alturaInput = document.getElementById('altura');
    const cotizarButton = document.getElementById('cotizar-button');
    const volverButton = document.getElementById('volver-button');

    const checkInputs = () => {
        const isPatenteValid = patenteInput.value.length >= 6 && patenteInput.value.length <= 7;
        const isChasisValid = chasisInput.value.length === 17;
        const isMotorValid = motorInput.value.length >= 4 && motorInput.value.length <= 8;
        const isDireccionValid = direccionInput.value.length > 0 && direccionInput.value.length <= 20;
        const isAlturaValid = alturaInput.value.length > 0 && alturaInput.value.length <= 4 && /^\d+$/.test(alturaInput.value);

        if (isPatenteValid && isChasisValid && isMotorValid && isDireccionValid && isAlturaValid) {
            cotizarButton.disabled = false;
        } else {
            cotizarButton.disabled = true;
        }
    };

    const handleInput = (event) => {
        let maxLength;
        switch (event.target.id) {
            case 'patente':
                maxLength = 7;
                break;
            case 'chasis':
                maxLength = 17;
                break;
            case 'motor':
                maxLength = 8;
                break;
            case 'direccion':
                maxLength = 20;
                break;
            case 'altura':
                maxLength = 4;
                event.target.value = event.target.value.replace(/\D/g, ''); // Eliminar caracteres no numéricos
                break;
        }

        if (event.target.value.length > maxLength) {
            event.target.value = event.target.value.slice(0, maxLength);
        }

        checkInputs();
    };

    patenteInput.addEventListener('input', handleInput);
    chasisInput.addEventListener('input', handleInput);
    motorInput.addEventListener('input', handleInput);
    direccionInput.addEventListener('input', handleInput);
    alturaInput.addEventListener('input', handleInput);

    cotizarButton.addEventListener('click', () => {
        localStorage.setItem('patente', patenteInput.value);
        localStorage.setItem('codChasis', chasisInput.value);
        localStorage.setItem('codMotor', motorInput.value);
        localStorage.setItem('direccion', direccionInput.value);
        localStorage.setItem('altura', alturaInput.value);
        window.location.href = '../HTML/verificarEmail.html'; // Reemplaza con la URL de la siguiente página
    });

    volverButton.addEventListener('click', () => {
        window.location.href = '../HTML/PlanesCotizados.html'; // Reemplaza con la URL de la página anterior
    });
});