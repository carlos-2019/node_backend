/*
    Ruta = '/api/hospitales'
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { getHospitales, crearHospitales, actualizarHospitales, borrarHospitales } = require('../controllers/hospitales');
const { validadJWT } = require('../middlewares/validar-jwt');
const router = Router();

router.get('/', getHospitales);

router.post('/',
  [
    validadJWT,
    check('nombre','El nombre del hospital es obligatorio').not().isEmpty(),
    validarCampos
  ],
  crearHospitales);

router.put('/:id',
  [
  ],
  actualizarHospitales);

router.delete('/:id', borrarHospitales);
module.exports = router;