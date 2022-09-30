const Role = require('../models/role');
const Usuario = require('../models/usuario');

// Validación de que el rol ingresado existe en la base de datos
const esRoleValido = async(rol = '') => {
    // Buscar un documento que contenga el rol ingresado
    const existeRol = await Role.findOne({rol});
    if(!existeRol){
        throw new Error(`El rol ${rol} no está registrado en la base de datos`);
    }
};

// Validar si un email ya existe
const existeEmail = async(correo = '') => {
    // Buscar un documento con el correo
    const existeEmail = await Usuario.findOne({correo});
    if(existeEmail){
        throw new Error(`El correo ${correo} ya está registrado en la base de datos`);
    }
};

// Validar si un usuario con un ID
const existeUsuarioPorID = async(id = '') => {
    // Buscar un documento con el correo
    const existeUsuario = await Usuario.findById(id);
    if(!existeUsuario){
        throw new Error(`El ID: ${id} no existe`);
    }
};

module.exports = {
    esRoleValido,
    existeEmail,
    existeUsuarioPorID
}