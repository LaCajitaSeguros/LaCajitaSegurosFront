document.addEventListener('DOMContentLoaded', function () {
    const emailInput = document.getElementById('EmailAddress');
    const emailError = document.getElementById('emailError');
    const successMessage = document.getElementById('successMessage');
    const reminderMessage = document.getElementById('reminderMessage');
    const loginButton = document.getElementById('loginButton');
    const loadingSpinner = document.querySelector('.loading-spinner');

    var data = localStorage.getItem('userData');
    var userId = localStorage.getItem('userId');
    console.log('userData:', data);
    console.log('userId:', userId);

    loginButton.addEventListener('click', async function () {
        const emailAddress = emailInput.value.trim();

        // Reset error and success messages
        emailError.style.display = 'none';
        successMessage.textContent = '';
        reminderMessage.textContent = '';
        overlay.classList.add('show');

        if (!emailAddress) {
            emailError.style.display = 'block';
            return;
        }

        loadingSpinner.style.display = 'inline-block';

        const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

        try {
            const responsePromise = fetch('https://localhost:7061/api/Authentication/ForgotPassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ emailAddress: emailAddress })
            });

            await delay(800); // Ensure spinner shows for at least 2 seconds
            const response = await responsePromise;

            if (response.ok) {
                const result = await response.text();
                successMessage.textContent = result;

                // Mostrar el mensaje de redirección con contador
                let countdown = 2;
                const redirectMessage = document.createElement('div');
                redirectMessage.id = 'redirectMessage';
                redirectMessage.style.color = 'blue';
                successMessage.appendChild(redirectMessage);
                overlay.classList.remove('show');
                const intervalId = setInterval(() => {
                    redirectMessage.textContent = `Serás redirigido a la página para cambiar tu contraseña en ${countdown} segundos.`;
                    countdown--;
                    
                    if (countdown < 0) {
                        clearInterval(intervalId);
                        window.location.href = '../HTML/modifyPassword.html';
                    }
                }, 1000);
            } else {
                const result = await response.text();
                reminderMessage.textContent = result;
                overlay.classList.remove('show');

            }
        } catch (error) {
            reminderMessage.textContent = 'Error al enviar la solicitud. Inténtalo de nuevo más tarde.';
        } finally {
            loadingSpinner.style.display = 'none';
        }
    });
});