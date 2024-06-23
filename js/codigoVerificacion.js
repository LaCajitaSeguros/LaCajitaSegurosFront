document.addEventListener('DOMContentLoaded', function() {
    var data = localStorage.getItem('userData');
    var userId = localStorage.getItem('userId');
    console.log('userData:', data);
    console.log('userId:', userId);
});

document.getElementById('verifyButton').addEventListener('click', async () => {
    const verificationCode = document.getElementById('VerificationCode').value;
    
    const successMessage = document.getElementById('successMessage');
    const reminderMessage = document.getElementById('reminderMessage');
    const spinner = document.querySelector('.spinner');

    console.log(verificationCode);
    successMessage.textContent = '';
    reminderMessage.textContent = '';
    overlay.classList.add('show');

    // Mostrar el spinner
    spinner.style.display = 'block';

    try {
        const response = await fetch('https://localhost:7061/api/Authentication/VerifyRegistration', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(verificationCode) 
        });

        const result = await response.json();

        if (response.ok) {
            successMessage.textContent = 'Código verificado correctamente. Registro completo.';
            setTimeout(() => {
                overlay.classList.remove('show');
                window.location.href = '../HTML/login.html';
            }, 1000); 
        } else {
            reminderMessage.textContent = result.message || 'Error al verificar el código.';
            setTimeout(() => {
                overlay.classList.remove('show');
            }, 1000); 
        }
    } catch (error) {
        reminderMessage.textContent = 'Error de red o del servidor.';
    } finally {
        // Ocultar el spinner
        setTimeout(() => {
            spinner.style.display = 'none';
        }, 2000); 
    }
});