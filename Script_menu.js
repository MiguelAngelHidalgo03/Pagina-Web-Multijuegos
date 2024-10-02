function cambiarSeccion(seccion) {
    const contenido = document.getElementById('contenido');
    switch(seccion) {
        case 'juego1':
            // Redirige a la página del juego Tres en Raya
            window.location.href = "TresEnRaya.html";
            break;
        case 'juego2':
            // Muestra un mensaje para el juego 2 en desarrollo
            contenido.innerHTML = '<p>Juego 2 en desarrollo...</p>';
            break;
        case 'opciones':
            // Muestra las opciones
            contenido.innerHTML = '<p>Opciones.</p>';
            break;
        default:
            // Muestra un mensaje predeterminado
            contenido.innerHTML = '<p>Selecciona una opción del menú</p>';
            break;
    }
}