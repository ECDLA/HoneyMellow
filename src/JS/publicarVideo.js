// Obtener el formulario y los elementos necesarios
const formulario = document.getElementById('formularioVideo');
const mensajeDiv = document.getElementById('mensaje');

// Manejar el envío del formulario
formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    // Obtener los valores del formulario
    const nuevoVideo = {
        id: document.getElementById('id').value,
        titulo: document.getElementById('titulo').value,
        descripcion: document.getElementById('descripcion').value,
        idDrive: document.getElementById('idDrive').value,
        portada: document.getElementById('portada').value,
        url: document.getElementById('url').value
    };

    // Validar que el ID sea único
    const videosGuardados = obtenerVideosGuardados();
    const idExiste = videosGuardados.some(video => video.id === nuevoVideo.id);

    if (idExiste) {
        mostrarMensaje('❌ Error: Ya existe un video con este ID', 'error');
        return;
    }

    // Guardar el nuevo video en localStorage
    videosGuardados.push(nuevoVideo);
    localStorage.setItem('videosPublicados', JSON.stringify(videosGuardados));

    // Mostrar mensaje de éxito
    mostrarMensaje('✅ ¡Video publicado exitosamente! Será visible en la página principal.', 'exito');

    // Limpiar el formulario
    formulario.reset();

    // Redirigir al inicio después de 2 segundos
    setTimeout(() => {
        window.location.href = '../index.html';
    }, 2000);
});

/**
 * Obtener todos los videos guardados en localStorage
 */
function obtenerVideosGuardados() {
    const videosGuardados = localStorage.getItem('videosPublicados');
    return videosGuardados ? JSON.parse(videosGuardados) : [];
}

/**
 * Mostrar mensaje al usuario
 */
function mostrarMensaje(mensaje, tipo) {
    mensajeDiv.textContent = mensaje;
    mensajeDiv.className = `mensaje ${tipo}`;
    
    // Desaparecer el mensaje después de 5 segundos
    setTimeout(() => {
        mensajeDiv.className = 'mensaje';
    }, 5000);
}
