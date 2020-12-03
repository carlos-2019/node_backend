/*
    Ruta = '/api/medicos'
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { getMedicos, crearMedico, actualizarMedico, borrarMedico } = require('../controllers/medicos');

const { validadJWT } = require('../middlewares/validar-jwt');
const router = Router();

router.get('/', getMedicos);

router.post('/',
  [
    validadJWT,
    check('nombre', 'El nombre del Medico es obligatorio').not().isEmpty(),
    check('hospital', 'El Hospital id debe ser valido').isMongoId(),
    validarCampos
  ],
  crearMedico);

router.put('/:id',
  [
    validadJWT,
    check('nombre', 'El nombre del Medico es obligatorio').not().isEmpty(),
    check('hospital', 'El Hospital id debe ser valido').isMongoId(),
    validarCampos
  ],
  actualizarMedico);

router.delete('/:id',
  validadJWT,
  borrarMedico
);
module.exports = router;