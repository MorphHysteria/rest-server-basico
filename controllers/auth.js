const {response} = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');

const login = async(req, res = response) => {

    // Extraer inormación
    const {correo, password} = req.body;
    try {
        // Verificar si el email existe
        const usuario = await Usuario.findOne({correo});
        if(!usuario){
            return res.status(400).json({
                msg: 'Usuario/password no son correctos - correo'
            });
        }

        // Verificar si el usuario está activo en la base de datos
        if(!usuario.estado){
            return res.status(400).json({
                msg: 'Usuario/password no son correctos - estado: false'
            });
        }

        // Verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if(!validPassword){
            return res.status(400).json({
                msg: 'Usuario/password no son correctos - password'
            });
        }

        // Generar el JSON Web Token
        const token = await generarJWT(usuario.id);

        // Devolver respuesta
        res.json({
            usuario,
            token
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Error al autenticar. Hable con el administrador'
        })
    }
};

const googleSingIn = async(req, res = response) => {
    const {id_token} = req.body;
    try {
        const {nombre, img, correo} = await googleVerify(id_token);
        let usuario = await Usuario.findOne({correo});
        if(!usuario){
            // Se debe crear el usuario nuevo
            const data = {
                nombre,
                correo,
                password: ':P',
                img,
                google: true
            };

            usuario = new Usuario(data);
            await usuario.save();
        }

        // Si el usuario en la base de datos tiene estado false
        if (!usuario.estado){
            return res.status(401).json({
                msg: 'Usuario bloqueado, hable con el administrador.'
            });
        }

        // Generar JWT
        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        });
    } catch (error) {
        res.status(400).json({
            msg: 'El token no se pudo verificar.'
        })
    }
};

module.exports = {
    login,
    googleSingIn
}