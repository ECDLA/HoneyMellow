const validarSesion = require("../auth.js");

module.exports = async function (context, req) {
    if (validarSesion(req)) {
        context.res = {
            status: 200,
            "Access-Control-Allow-Origin": "*"
        }
    } else {
        context.res = {
            status: 401,
            headers: {
                "WWW-Authenticate": "Basic realm=\"Admin\"",
                "Access-Control-Allow-Origin": "*"
            }
        }
    }
}