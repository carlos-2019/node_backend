/*
    ruta: /api/todo/:busqueda
*/
const { Router } = require('express');
const { validadJWT } = require('../middlewares/validar-jwt');

const { buscarTodo, buscarPorColeccion } = require('../controllers/busquedas');


const router = Router();
router.get('/:busqueda', validadJWT, buscarTodo);
router.get('/coleccion/:tabla/:busqueda', validadJWT, buscarPorColeccion);
    
module.exports = router;