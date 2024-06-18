document.addEventListener('DOMContentLoaded', function () {
    const emailInput = document.getElementById('EmailAddress');
    const emailError = document.getElementById('emailError');
    const successMessage = document.getElementById('successMessage');
    const reminderMessage = document.getElementById('reminderMessage');
    const loginButton = document.getElementById('loginButton');
    const loadingSpinner = document.querySelector('.loading-spinner');

    loginButton.addEventListener('click', async function () {
        const emailAddress = emailInput.value.trim();

        // Reset error and success messages
        emailError.style.display = 'none';
        successMessage.textContent = '';
        reminderMessage.textContent = '';

        if (!emailAddress) {
            emailError.style.display = 'block';
            return;
        }

        loadingSpinner.style.display = 'inline-block';

        try {
            const response = await fetch('https://localhost:7061/api/Authentication/ForgotPassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ emailAddress: emailAddress })
            });

            if (response.ok) {
                const result = await response.text();
                successMessage.textContent = result;

                // Mostrar el mensaje de redirección con contador
                let countdown = 5;
                const redirectMessage = document.createElement('div');
                redirectMessage.id = 'redirectMessage';
                redirectMessage.style.color = 'blue';
                successMessage.appendChild(redirectMessage);

                const intervalId = setInterval(() => {
                    redirectMessage.textContent = `Serás redirigido a la página para cambiar tu contraseña en ${countdown} segundos.`;
                    countdown--;

                    if (countdown < 0) {
                        clearInterval(intervalId);
                        window.location.href = './modifyPassword.html';
                    }
                }, 1000);
            } else {
                const result = await response.text();
                reminderMessage.textContent = result;
            }
        } catch (error) {
            reminderMessage.textContent = 'Error al enviar la solicitud. Inténtalo de nuevo más tarde.';
        } finally {
            loadingSpinner.style.display = 'none';
        }
    });
});
