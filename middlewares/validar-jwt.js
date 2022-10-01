const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT = async(req = request, res = response, next) => {
    // Leer token desde los headers
    const token = req.header('x-token');
    if(!token){
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }
    // Si se envió un token
    try {
        // Extraer el uid del usuario autenticado
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        //Leer información del usuario autenticado
        const usuarioAutenticado = await Usuario.findById(uid);

        // Si el usuario no existe ne la base de datos
        if(!usuarioAutenticado){
            return res.status(401).json({
                msg: 'Token no válido - Usuario no existente'
            });
        }
        
        // Verificar si el usuario tiene estado en true
        if(!usuarioAutenticado.estado){
            return res.status(401).json({
                msg: 'Token no válido - Usuario con estado: false'
            });
        }

        // Guardar información del usuario en la petición
        req.usuarioAutenticado = usuarioAutenticado;

        // Continuar con el siguiente middleware
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no válido'
        });
    }
};

module.exports = {
    validarJWT
}