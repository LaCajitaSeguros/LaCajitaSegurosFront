document.addEventListener('DOMContentLoaded', function () {
    const patenteInput = document.getElementById('patente');
    const chasisInput = document.getElementById('chasis');
    const motorInput = document.getElementById('motor');
    const cotizarButton = document.getElementById('cotizar-button');
    const volverButton = document.getElementById('volver-button');

    const checkInputs = () => {
        const isPatenteValid = patenteInput.value.length >= 6 && patenteInput.value.length <= 7;
        const isChasisValid = chasisInput.value.length === 17;
        const isMotorValid = motorInput.value.length >= 4 && motorInput.value.length <= 8;

        if (isPatenteValid && isChasisValid && isMotorValid) {
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
        }

        if (event.target.value.length > maxLength) {
            event.target.value = event.target.value.slice(0, maxLength);
        }

        checkInputs();
    };

    patenteInput.addEventListener('input', handleInput);
    chasisInput.addEventListener('input', handleInput);
    motorInput.addEventListener('input', handleInput);

    cotizarButton.addEventListener('click', () => {
        localStorage.setItem('patente', patenteInput.value);
        localStorage.setItem('codChasis', chasisInput.value);
        localStorage.setItem('codMotor', motorInput.value);
        window.location.href = '../HTML/siguiente-pagina.html'; // Reemplaza con la URL de la siguiente página
    });

    volverButton.addEventListener('click', () => {
        window.location.href = '../HTML/PlanesCotizados.html'; // Reemplaza con la URL de la página anterior
    });
});
