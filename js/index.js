document.addEventListener('DOMContentLoaded', function() {
    localStorage.clear();
    document.querySelector('button').addEventListener('click', function() {
        window.location.href = 'cotizaciones.html';
    });
});