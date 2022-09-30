const {validationResult} = require('express-validator');

// Validar que no existen errores después de los middlewares de verificación
const validarCampos = (req, res, next) => {
    // Obtener el arreglo con los errores encontrados en las validaciones de express
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors);
    }
    // Indica que se debe pasar al siguiente middleware en caso de existir
    next();
};

module.exports = {
    validarCampos
}