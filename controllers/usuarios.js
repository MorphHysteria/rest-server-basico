const {response, request} = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

// Controladores de rutas
const usuariosGET = async(req = request, res = response) => {
    // Condición de usuario activo
    const esUsuarioActivo = {estado:true};
    // Obtener query params
    const {limite = 5, desde = 0} = req.query;

    // Colección de promesas para consultar a la base de datos, se ralizarán de manera simultánea
    // Desestructuración de arreglos
    const [total, usuarios] = await Promise.all([
        Usuario.count(esUsuarioActivo),
        Usuario.find(esUsuarioActivo).skip(desde).limit(limite)
    ])
    
    // Retorna el objeto con los usuarios
    res.json({
        total,
        usuarios
    });
};

const usuariosPOST = async(req, res = response) => {
    // Extraer los datos obligatorios
    const {nombre, correo, password, rol} = req.body;

    // Crear instancia de usuario
    const usuario = new Usuario({nombre, correo, password, rol});

    // Cifrar contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    // Guardar en Mongo
    await usuario.save();

    // Retornar respuesta
    res.json(usuario);
};

const usuariosPUT = async(req, res = response) => {
    // Extraer ID a actualizar
    const {id} = req.params;
    
    // Excluir parámetros que no se van a actualizar
    const {_id, password, google, correo, ...resto} = req.body;

    // Validar contra base de datos
    // Si se quiere cambiar la contraseña
    if(password){
        // Cifrar contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    // Actualizar datos del usuario
    const usuario = await Usuario.findByIdAndUpdate(id, resto, {'new': true});

    res.json(usuario);
};

const usuariosPATCH = (req, res = response) => {
    res.json({
        msg: 'patch_API - Controlador'
    });
};

const usuariosDELETE = async(req, res = response) => {
    const {id} = req.params;

    // Borrado físico
    // const usuario = await Usuario.findByIdAndDelete(id);

    // Cambiar el estado del usuario, recomendado para no perder la integridad referencial de la base de datos
    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false});

    res.json(usuario);
};

module.exports = {
    usuariosGET,
    usuariosPOST,
    usuariosPUT,
    usuariosPATCH,
    usuariosDELETE
}