const { response } = require('express');

const getHospitales = (req, res = response) => {
    res.status(200).json({
        ok: true,
        mensaje: 'Obteniendo Hospitales'
    });
}

const crearHospitales = (req, res = response) => {
    res.status(200).json({
        ok: true,
        mensaje: 'crear Hospitales'
    });
}

const actualizarHospitales = (req, res = response) => {
    res.status(200).json({
        ok: true,
        mensaje: 'actualizar Hospitales'
    });
}

const borrarHospitales = (req, res = response) => {
    res.status(200).json({
        ok: true,
        mensaje: 'eliminando Hospitales'
    });
}



module.exports = {
    getHospitales,
    crearHospitales,
    actualizarHospitales,
    borrarHospitales
}