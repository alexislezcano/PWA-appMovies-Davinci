// Chequeo si el browser soport SW

if ('serviceWorker' in navigator){
    navigator.serviceWorker.register('../sw.js').then((message)=>{
        console.log('Service worker esta listo y funcionando!');
    })
} else { //no soporta Service Worker el browser
    alert('Este browser no soporta Service Worker');
}