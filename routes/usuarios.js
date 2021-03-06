/*
  Ruta: /api/usuarios
 */

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario } = require('../controllers/usuarios')
const { validadJWT } = require('../middlewares/validar-jwt');
const router = Router();

router.get('/', validadJWT, getUsuarios);

router.post('/',
  [
    // validar para que no sea vacio
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatorio').not().isEmpty(),
    check('email', 'El Email es obligatorio').isEmail(),
    validarCampos
  ],
  crearUsuario);

router.put('/:id',
  [
    validadJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El Email es obligatorio').isEmail(),
    check('role', 'El Rol es obligatorio').not().isEmpty(),
    validarCampos,
  ],
  actualizarUsuario);

router.delete('/:id', validadJWT, borrarUsuario);
module.exports = router;