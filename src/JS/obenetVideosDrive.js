// Información necesaria
const apiKey = "AIzaSyBPq20euVVhXvkzLX5FbdxbBCLdmJH3v3M"
let folderId = "1laPxK8i4R2nKbn4BVUGFBViTSyGFWTv4"

// Parametros para obtener la información de la url de Google Drive
const base = "https://www.googleapis.com/drive/v3/files";
const carpeta = `?q='${folderId}' in parents`;
const limite = "&pageSize=200";
const campos = "&fields=files(id,name,description,mimeType)";
const key = `&key=${apiKey}`;

const url = `${base}${carpeta}${limite}${campos}${key}`;

async function conexionAPI() {
    let conexion = await fetch(url);
    let conexionConvertida = await conexion.json();

    return conexionConvertida.files;
}

async function transformarDatos() {
    const videos = await conexionAPI();
    const contenido = videos.map((video, indice) => {
        titulo = extraerTitulo(video.name);
        return {
            // id: `${indice + 1}`,
            idDrive: titulo.idDrive,
            tituloRomaji: titulo.romaji,
            tituloEspañol: titulo.espanol,
            urlDrive: `https://drive.google.com/file/d/${video.id}/view`,
            urlYoutube: ''
        }
    })

    // const fs = require('fs');
    // fs.writeFileSync(
    //     'videosYami.json',
    //     JSON.stringify(contenido, null, 2)
    // );
    // console.log(` ${contenido.length} documentos exportados`)
}

function extraerTitulo(titulo) {
    const idDrive = titulo.split(" ")[0];
    const romaji = titulo.split("[")[0].split(" ").slice(1).join(" ").trim();
    let espanol = "";

    if (titulo.includes("[")) {
        espanol = titulo.split("[")[1].split("]")[0];
    }

    return { idDrive, romaji, espanol };
}

transformarDatos()