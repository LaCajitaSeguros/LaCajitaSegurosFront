
document.addEventListener('DOMContentLoaded', function () {
    const emailInput = document.getElementById('Email');
    const verificationCodeInput = document.getElementById('VerificationCode');
    const passwordInput = document.getElementById('NewPassword');
    const passwordError = document.getElementById('passwordError');
    const responseMessage = document.getElementById('responseMessage');
    const resetButton = document.getElementById('resetButton');
    const loadingSpinner = document.getElementById('spinner');
    const togglePassword = document.getElementById('togglePassword');
    const backButton = document.getElementById('backButton');

    const passwordRequirements = document.getElementById('passwordRequirements');
    var data = localStorage.getItem('userData')
    var userId = localStorage.getItem('userId')
    console.log('userData:', data);
    console.log('userId:', userId);
    passwordInput.addEventListener('input', function () {
        const password = passwordInput.value;

        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecialChar = /[@\-+?]/.test(password);
        const isLengthValid = password.length >= 6;

        if (!isLengthValid || !hasUpperCase || !hasLowerCase || !hasNumber || !hasSpecialChar) {
            passwordError.textContent = 'La contraseña debe tener al menos 6 caracteres, una mayúscula, una minúscula, un número y un caracter especial [@, -, +, ?].';
            passwordError.style.color = 'red';
            passwordRequirements.style.display = 'block';
        } else {
            passwordError.textContent = '';
            passwordRequirements.style.display = 'none';
        }

    });

    if (resetButton) {
        resetButton.addEventListener('click', async function () {
            const email = emailInput.value.trim();
            const verificationCode = verificationCodeInput.value.trim();
            const newPassword = passwordInput.value.trim();

            // Reset error and response messages
            passwordError.style.display = 'none';
            responseMessage.textContent = '';

            if (!email || !verificationCode || !newPassword) {
                responseMessage.textContent = 'Por favor, completa todos los campos.';
                responseMessage.style.color = 'red';
                return;
            }

            loadingSpinner.style.display = 'inline-block';

            try {
                const response = await fetch('https://localhost:7061/api/Authentication/VerifyAndResetPassword', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ 
                        emailAddress: email,
                        verificationCode: verificationCode,
                        newPassword: newPassword 
                    })
                });

                const result = await response.text();

                if (response.ok) {
                    responseMessage.textContent = `${result}`;
                    responseMessage.style.color = 'green';

                    // Redirigir a la página de inicio de sesión después de 3 segundos
                    setTimeout(() => {
                        window.location.href = '../HTML/login.html';
                    }, 3000);
                } else {
                    responseMessage.textContent = result;
                    responseMessage.style.color = 'red';
                }
            } catch (error) {
                responseMessage.textContent = 'Error al enviar la solicitud. Inténtalo de nuevo más tarde.';
                responseMessage.style.color = 'red';
            } finally {
                loadingSpinner.style.display = 'none';
            }
        });
    }

    if (togglePassword) {
        togglePassword.addEventListener('click', function () {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.textContent = type === 'password' ? '👁️' : '🙈';
        });
    }

    if (backButton) {
        backButton.addEventListener('click', function () {
            window.location.href = '../HTML/generatePassword.html';
        });
    }
});
