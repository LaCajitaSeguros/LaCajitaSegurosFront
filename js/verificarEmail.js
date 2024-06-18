document.getElementById("loginButton").addEventListener("click", function() {
    var emailAddress = document.getElementById('EmailAddress').value;
    var emailError = document.getElementById('emailError');
    var spinner = document.querySelector('.loading-spinner');
    
    spinner.style.display = 'block';
    emailError.style.display = 'none';
    document.getElementById('EmailAddress').classList.remove('errorEmail');
    if (!emailAddress) {
        emailError.style.display = 'block';
        spinner.style.display = 'none';
        return;
    }
    fetch('https://localhost:7061/api/Authentication/CheckEmail', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ EmailAddress: emailAddress })
    })
    .then(response => response.json())
    .then(data => {
        if (data.exists) {
            emailError.style.display = 'block';
            document.getElementById('EmailAddress').classList.add('errorEmail');
            emailError.textContent = 'El correo ya esta registrado..';
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
        } else {
            document.getElementById('successMessage').textContent = 'El correo no esta registrado..';
            setTimeout(() => {
                window.location.href = 'registrate.html';
            }, 2000);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    })
    .finally(() => {
        spinner.style.display = 'none';
    });
});