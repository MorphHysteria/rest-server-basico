const {response} = require('express')

// Controladores de rutas
const usuariosGET = (req, res = response) => {
    // Obtener query params
    const {q, nombre = 'No Name', apikey, page = 1, limit} = req.query;
    res.json({
        msg: 'get_API - Conrolador',
        q,
        nombre,
        apikey,
        page,
        limit
    });
};

const usuariosPOST = (req, res = response) => {
    // Obtener datos de POST
    const {nombre, edad} = req.body;

    res.json({
        msg: 'post_API - Controlador',
        nombre, edad
    });
};

const usuariosPUT = (req, res = response) => {
    const {id} = req.params
    res.json({
        msg: 'put_API - Controlador',
        id
    });
};

const usuariosPATCH = (req, res = response) => {
    res.json({
        msg: 'patch_API - Controlador'
    });
};

const usuariosDELETE = (req, res = response) => {
    res.json({
        msg: 'delete_API - Controlador'
    });
};

module.exports = {
    usuariosGET,
    usuariosPOST,
    usuariosPUT,
    usuariosPATCH,
    usuariosDELETE
}