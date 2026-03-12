// const urlAPI = "http://localhost:7071/api/FunctionMellowAPI" // Local
const urlAPI = "https://mellow-api.azurewebsites.net/api/FunctionMellowAPI"
const cuerpovideos = document.querySelector("[data-videos]");
let cacheDeVideos = null;

async function conexionAPI() {
    try {
        if (cacheDeVideos) {
            return cacheDeVideos;
        }
        let conexion = await fetch(urlAPI);
        let conexionConvertidaJSON = await conexion.json();
    
        cacheDeVideos = conexionConvertidaJSON;
        return conexionConvertidaJSON;
        
    } catch (error) {
        console.error("Error al conectar a la base de datos", error);
    }
}

function crearFicha(id, titulo, portada, idDrive) {
    let ficha = document.createElement("div");
    ficha.className = "video";
    ficha.innerHTML = 
    `
        <a href="https://drive.google.com/file/d/${idDrive}/preview" target="_blank">
            <figure class="imagen">
                <img class="miniatura" class="miniatura" src="${portada}" alt="" id="${id}">
            </figure>
        </a>

        <p>${id} - ${titulo}</p>
    `

    return ficha;
}

async function eliminarFichas() {
    // let listaVideos = await conexionAPI();
    let video = document.querySelectorAll(".imagen");

    video.forEach(clases => clases.addEventListener("click", evento => {        
        let idVideo = evento.target.id;

        while(cuerpovideos.firstChild) {
            cuerpovideos.removeChild(cuerpovideos.firstChild);
        }

        mostrarVideo(idVideo);
    }));

    
}

function hojaDeEstilosParaVideo(archivo = false) {
    var elementoCSS = document.querySelector("[data-styles]");

    if (archivo === true) {
        elementoCSS.href = "CSS/styles-video.css";
    } else {
        elementoCSS.href = "CSS/styles.css";
    }
}

async function mostrarVideo(idVideo) {
    let listaVideos = await conexionAPI();
    let videoEncontrado = listaVideos.find(video => video.id === idVideo);
    let idDrive = videoEncontrado.idDrive;

    let video = document.createElement("div");
    video.className = "video-responsive";
    video.innerHTML = 
    `
       <iframe src="https://drive.google.com/file/d/${idDrive}/preview" frameborder="0" allowfullscreen></iframe>
    `

    let informacionVideo = document.createElement("div");
    informacionVideo.id = "datos";
    informacionVideo.innerHTML = 
    `
        <h1>${videoEncontrado.id} - ${videoEncontrado.titulo}</h1>
        <p id="contenido">${videoEncontrado.descripcion}</p>
    `

    hojaDeEstilosParaVideo(true);
    cuerpovideos.appendChild(video);
    cuerpovideos.appendChild(informacionVideo);
}

async function obtenerYMostrarVideos() {
    let listaVideos = await conexionAPI();
    listaVideos.forEach(video =>
        cuerpovideos.appendChild(crearFicha(video.id, video.titulo, video.portada, video.idDrive))
    );

    // eliminarFichas();
}

obtenerYMostrarVideos();
// eliminarFichas();