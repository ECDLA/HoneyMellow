// Importar libreria CosmosDB
const { CosmosClient } = require("@azure/cosmos");

const clienteAPI = new CosmosClient({
    endpoint: process.env.COSMOS_URL, // process.env es como el cliente de CosmosDB lee las variables de entorno.
    key: process.env.COSMOS_KEY
});

// Crea las varialbes para buscar los datos
const baseDeDatos = clienteAPI.database(process.env.COSMOS_DATABASE);
const contenedor = baseDeDatos.container(process.env.COSMOS_CONTAINER);

// context me devuelve los datos de y Azure
// req son los datos que manda el cliente
module.exports = async function (context, req) {
    // Crea una constante la cual espere el resultado del await para introducir resources.
    const { resources: listaVideos } = await contenedor.items
        .readAll()
        .fetchAll()

    context.res = {
        status: 200,
        headers: {
            "Access-Control-Allow-Origin": "*"
        },
        body: listaVideos,
    }
};