// ----- Configuración global --------------------------------------------------------------------------------
const urlMellowAPI = "videosYami.json" // Usar la URL cuando se quiera conectar a Cosmos DB: https://mellow-api.azurewebsites.net/api/FunctionMellowAPI
const cuerpoVideosDOM = document.querySelector("[data-videos]");

// ----- CONF. renderizarMasVideos() --------------------------------------------------------------------------------
let listaVideos = [];
let videosPorPagina = 20;
let limiteVideos = videosPorPagina;
let desplazamiento = 0;

// ----- CONEXIÓN A LA BD --------------------------------------------------------------------------------
async function conexionAPI() {
    try {
        let conexion = await fetch(urlMellowAPI);
        let conexionConvertidaJSON = await conexion.json()

        // Quitar .videos cuando se use la API
        return conexionConvertidaJSON.videos;

    } catch (error) {
        console.error("Error al conectar a la base de datos", error);
    }
}

// ----- EXTRACIÓN DE ID'S --------------------------------------------------------------------------------
function obtenerIDVideo(url) {
    // Se crea un objeto usando la clase URL la cual ya conoce la estructura de una url por lo que sabe identificar partes claves como ".hostname".
    const urlObjeto = new URL(url);
    let idVideo = "";

    // Usando la url ya convertida a objeto, ve si la url incluye o viene de "youtu.be".
    if (urlObjeto.hostname.includes("youtu.be")) {

        // Con .slice se recorre una posición para eliminar "/"
        idVideo = urlObjeto.pathname.slice(1);

    } else if (urlObjeto.hostname.includes("youtube.com")) {

        // Busca dentro del objeto en "searchParams" el parametro "v" y retorna el valor con .get
        idVideo = urlObjeto.searchParams.get("v");

    } else if (urlObjeto.hostname.includes("drive.google.com")) {
        idVideo = urlObjeto
            .pathname
            .slice(8)
            .replace("/view", "")
            .replace("?usp=sharing", "")
            .replace("/preview", "")
            ;

    } else {
        console.log("Url de video incorrecta");
        return null;
    }

    return idVideo;
}

// ----- CREAR ficha DE VIDEO EN HTML --------------------------------------------------------------------------------
// Preview Google Drive: https://drive.google.com/file/d/${obtenerIDVideo(urlVideo)}/preview
// Imagen YouTube: https://img.youtube.com/vi/${idVideo}/mqdefault.jpg
function crearTarjetaVideo(numeracionDrive, tituloRomaji, tituloEspañol, urlDrive, urlYoutube) {
    let fichaDOM = document.createElement("div");
    let idURL = obtenerIDVideo(urlDrive);
    let urlMiniatura = "";
    console.log(urlYoutube)

    if (urlYoutube == "") {
        idURL = obtenerIDVideo(urlDrive);
        urlMiniatura = `https://drive.google.com/thumbnail?id=${idURL}`
    } else {
        idURL = obtenerIDVideo(urlYoutube);
        urlMiniatura = `https://img.youtube.com/vi/${idURL}/mqdefault.jpg`
    }

    fichaDOM.innerHTML =
        `
        <a href="https://drive.google.com/file/d/${idURL}/preview" target="_blank">
            <figure class="imagen">
                <img class="miniatura" class="miniatura" src="${urlMiniatura}" alt="" id="${numeracionDrive}">
                
            </figure>
        </a>

        <p>${numeracionDrive} - ${tituloRomaji} 『${tituloEspañol}』</p>
    `

    return fichaDOM;
}

// ----- OBTIENE LA LISTA DE VIDEOS Y LOS ORGANIZA --------------------------------------------------------------------------------
async function obtenerVideos() {
    // Hace una llamada a la API entregando un array de objetos
    listaVideos = await conexionAPI();

    // Ordena la lista mediante la función .sort()
    listaVideos.sort(
        // .sort() envia dos númeos a comprar a la función anonima
        function comparar(a, b) {
            // Compara cuanto es la resta y si es negativo entonces a va delante de b [b, a]
            return parseFloat(b.idDrive) - parseFloat(a.idDrive);
        }
    );

    renderizarVideos(listaVideos, desplazamiento, limiteVideos);
}

// ------ MUESTRA LOS VIEOS EN PANTALLA --------------------------------------------------------------------------------
function renderizarVideos(videos, desplazamiento, limiteVideos) {
    let listaVideosVisible = videos.slice(desplazamiento, limiteVideos);

    listaVideosVisible.forEach(video => {
        cuerpoVideosDOM.appendChild(
            crearTarjetaVideo(video.idDrive, video.tituloRomaji, video.tituloEspañol, video.urlDrive, video.urlYoutube)
        );
    }
    );
}

// ----- RENDERIZAR MÁS VIDEOS EN PANTALLA --------------------------------------------------------------------------------
function renderizarMasVideos() {
    limiteVideos += videosPorPagina;
    desplazamiento += videosPorPagina;
    renderizarVideos(listaVideos, desplazamiento, limiteVideos);

    if (limiteVideos >= listaVideos.length) {
        let btnMostrarMasDOM = document.getElementById("btn-mostrar-mas");
        btnMostrarMasDOM.style.display = "none";
    }
}

obtenerVideos();