document.getElementById('verifyButton').addEventListener('click', async () => {
    const verificationCode = document.getElementById('VerificationCode').value;
    
    const successMessage = document.getElementById('successMessage');
    const reminderMessage = document.getElementById('reminderMessage');

    console.log(verificationCode);
    successMessage.textContent = '';
    reminderMessage.textContent = '';

    try {
        const response = await fetch('https://localhost:7061/api/Authentication/VerifyRegistration', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(verificationCode) // Send the verification code as a plain string
        });

        const result = await response.json();

        if (response.ok) {
            successMessage.textContent = 'Código verificado correctamente. Registro completo.';
            window.location.href = './login.html';
        } else {
            reminderMessage.textContent = result.message || 'Error al verificar el código.';
        }
    } catch (error) {
        reminderMessage.textContent = 'Error de red o del servidor.';
    } 
});