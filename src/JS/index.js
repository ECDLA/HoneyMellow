// const urlAPI = "https://mellow-api.azurewebsites.net/api/FunctionMellowAPI"
const urlAPI = "/db.json"
const cuerpovideos = document.querySelector("[data-videos]");
let cacheDeVideos = null;

async function conexionAPI() {
    try {
        let conexion = await fetch(urlAPI);
        let conexionConvertidaJSON = await conexion.json()

        // Quitar .videos cuando se use la API
        return conexionConvertidaJSON.videos;

    } catch (error) {
        console.error("Error al conectar a la base de datos", error);
    }
}

function crearFicha(id, tituloRomaji, tituloEspañol, portada, urlDrive) {
    let ficha = document.createElement("div");
    ficha.className = "video";
    ficha.innerHTML =
        `
        <a href="https://drive.google.com/file/d/${obtenerIdDrive(urlDrive)}/preview" target="_blank">
            <figure class="imagen">
                <img class="miniatura" class="miniatura" src="IMG/Miniaturas/${id}.webp" alt="" id="${id}">
            </figure>
        </a>

        <p>${id} - ${tituloRomaji} ${tituloEspañol}</p>
    `

    return ficha;
}

async function obtenerYMostrarVideos() {
    // Hace una llamada a la API entregando un array de objetos
    let listaVideos = await conexionAPI();

    // Ordena la lista mediante la función .sort()
    listaVideos.sort(
        // .sort () envia dos númeos a comprar a la función anonima
        function comparar(a, b) {
            // Compara cuanto es la resta y si es negativo entonces a va delante de b [b, a]
            return Number(b.id) - Number(a.id);
        }
    );
    console.log(listaVideos)
    listaVideos.forEach(video => {
        cuerpovideos.appendChild(
            crearFicha(video.id, video.tituloRomaji, video.tituloEspañol, video.portada, video.urlDrive)
        );
    }
    );

    // eliminarFichas();
}

function obtenerIdDrive(urlDrive) {
    return urlDrive.slice(32, 65);
}

async function eliminarFichas() {
    // let listaVideos = await conexionAPI();
    let video = document.querySelectorAll(".imagen");

    video.forEach(clases => clases.addEventListener("click", evento => {
        let idVideo = evento.target.id;

        while (cuerpovideos.firstChild) {
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

    // hojaDeEstilosParaVideo(true);
    cuerpovideos.appendChild(video);
    cuerpovideos.appendChild(informacionVideo);
}

obtenerYMostrarVideos();
// eliminarFichas();