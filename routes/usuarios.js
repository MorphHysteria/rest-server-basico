const {Router} = require('express');
const {check, query} = require('express-validator');

const { usuariosGET, usuariosPOST, usuariosPUT, usuariosPATCH, usuariosDELETE } = require('../controllers/usuarios');
const { esRoleValido, existeEmail, existeUsuarioPorID } = require('../helpers/db-validators');
const {validarCampos, validarJWT, esAdminRole, tieneRole} = require('../middlewares');
const router = Router()

// Rutas de usuarios
// Ruta GET
router.get('/', [
    query('limite', "El valor 'límite' debe ser numérico").isNumeric().optional(),
    query('desde', "El valor 'desde' debe ser numérico").isNumeric().optional(),
    validarCampos
], usuariosGET);

// Ruta POST    
router.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe contener más de 6 caracteres').isLength({min:6}),
    check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom(existeEmail),
    // check('rol', 'No es un rol permitido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom(esRoleValido),
    validarCampos
],usuariosPOST)
    
// Ruta PUT
router.put('/:id', [
    check('id', 'No es in ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorID),
    check('rol').custom(esRoleValido),
    validarCampos
], usuariosPUT);
    
// Ruta PATCH
router.patch('/', usuariosPATCH);

// Ruta DELETE
router.delete('/:id', [
    validarJWT,
    // esAdminRole,
    tieneRole('ADMIN_ROLE', 'VENTAS_ROLE'),
    check('id', 'No es in ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorID),
    validarCampos
], usuariosDELETE);

module.exports = router;