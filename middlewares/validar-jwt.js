const jwt = require('jsonwebtoken');
const { response } = require('express');
const validadJWT = (req, res = response, next) => {

    // Leer el Token
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            ok: false,
            mensaje: 'No hay token en la peticion'
        });
    }
    try {
        const { uid } = jwt.verify(token, process.env.JWT_SECRET);
        req.uid = uid;
        next();
    } catch (error) {
        res.status(401).json({
            ok: false,
            mensaje: 'Token no valido'
        })
    }
}

module.exports = {
    validadJWT
}