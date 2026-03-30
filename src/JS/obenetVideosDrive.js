const apiKEY = "AIzaSyC-wJ-3abe2dDao171zFIQW4hvLHNjKZfk"
const urlCarpetaDriveVideos = "https://drive.google.com/drive/u/0/folders/1laPxK8i4R2nKbn4BVUGFBViTSyGFWTv4"

async function conexionAPI() {
    const base    = "https://www.googleapis.com/drive/v3/files";
    const carpeta = `?q='${folderId}' in parents`;
    const limite  = "&pageSize=100";
    const campos  = "&fields=files(id,name,description,mimeType,modifiedTime)";
    const key     = `&key=${apiKey}`;


    let conexion = await fetch("https://www.googleapis.com/drive/v3/files?q='${folderId}'&pageSize=100&fields=files(id,name,description,mimeType,modifiedTime)`&key=${apiKey}`");
    let conexionConvertida = await conexion.json();

    return
}