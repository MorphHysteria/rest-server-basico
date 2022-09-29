const {Router} = require('express');
const { usuariosGET, usuariosPOST, usuariosPUT, usuariosPATCH, usuariosDELETE } = require('../controllers/usuarios');
const router = Router()

// Rutas de usuarios
router.get('/', usuariosGET);
router.post('/', usuariosPOST)
router.put('/:id', usuariosPUT);
router.patch('/', usuariosPATCH);
router.delete('/', usuariosDELETE);

module.exports = router;