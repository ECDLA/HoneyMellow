// const urlAPI = "https://mellow-api.azurewebsites.net/api/FunctionMellowAPI"
const urlAPI = "db.json"
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

function crearFicha(id, tituloRomaji, tituloEspañol, urlDrive, urlYoutube) {
    let ficha = document.createElement("div");
    let idYoutube = obtenerIdVideo(urlYoutube);

    ficha.className = "video";
    ficha.innerHTML =
        `
        <a href="https://drive.google.com/file/d/${obtenerIdVideo(urlDrive)}/preview" target="_blank">
            <figure class="imagen">
                <img class="miniatura" class="miniatura" src="https://img.youtube.com/vi/${idYoutube}/mqdefault.jpg" alt="" id="${id}">
                
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
            crearFicha(video.id, video.tituloRomaji, video.tituloEspañol, video.urlDrive, video.urlYoutube)
        );
    }
    );
}

obtenerIdVideo("https://drive.google.com/file/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs/view?usp=sharing")

function obtenerIdVideo(url) {
    // Se crea un objeto usando la clase URL la cual ya conoce la estructura de una url por lo que sabe identificar partes claves como ".hostname".
    const urlObjeto = new URL(url);
    let idYoutube = "";

    // Usando la url ya convertida a objeto, ve si la url incluye o viene de "youtu.be".
    if (urlObjeto.hostname.includes("youtu.be")) {

        // Con .slice se recorre una posición para eliminar "/"
        idYoutube = urlObjeto.pathname.slice(1);

    } else if (urlObjeto.hostname.includes("youtube.com")) {

        // Busca dentro del objeto en "searchParams" el parametro "v" y retorna el valor con .get
        idYoutube = urlObjeto.searchParams.get("v");

    } else if (urlObjeto.hostname.includes("drive.google.com")) {
        idYoutube = urlObjeto
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

    return idYoutube;
}

obtenerYMostrarVideos();