const status_element = document.getElementById('status');

window.addEventListener('offline', event => {
    status_element = window.location.href = '404.html';
});

window.addEventListener('online', event => {
    status_element.innerHTML = 'Vuelves a tener conexión a internet.'
});


if ( !navigator.onLine ){
   status_element.innerHTML = console.log('Estoy sin conexion en el momento de carga! horror!');
}