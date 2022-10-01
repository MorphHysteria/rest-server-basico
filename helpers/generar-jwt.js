const jwt = require('jsonwebtoken');

const generarJWT = (uid = '') => {
    return new Promise((resolve, reject) => {
        // Solo se va a almacenar en uid del usuario en el payload del JWT
        const payload = {uid};
        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn:'4h'
        }, (err, token) => {
            if(err){
                console.log(err);
                reject('No se pudo generar el token');
            } else {
                resolve(token);
            }
        });
    });
};

module.exports = {
    generarJWT
}