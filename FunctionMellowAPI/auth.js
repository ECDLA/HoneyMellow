module.exports = validarSesion;

function validarSesion(peticion) {
    // Se le pide al navegador, en la cabezera el valor de "authorization" y si devuelve "undefined" es porque no se ha inicioado sesión.
    // Si ya se inicio sesión devolvera una cadena en base 64 la cual es la contraseña (Basic dXN1YXJpbzpjb250cmFzZcOxYQ==).
    const encabezadoSesion = peticion.headers["authorization"];

    if (!encabezadoSesion) {
        return false;
    }

    // Se guarda en variable y se recorre 6 espacios para eliminar "Basic ".
    const tokenBase64 = encabezadoSesion.slice(6);

    // Con "Buffer" se indica que la variable tokenBase64 esta en Base 64
    // Con .toString, convierte la base 64 a texto legible retornando "usuario:contraseña"
    // .split elimina el signo ":".
    const credencialesUsuario = Buffer
        .from(tokenBase64, "base64")
        .toString("utf-8")
        .split(":");

    if (credencialesUsuario[0] === process.env.ADMIN_USER_1 && credencialesUsuario[1] === process.env.ADMIN_PASSWORD_1) {
        return true
    }

    return false;
}