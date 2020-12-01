const { response } = require('express');
const Hospital = require('../models/hospital');

const getHospitales = async (req, res = response) => {

    const hospitales = await Hospital.find()
        .populate('usuario', 'nombre img');

    res.status(200).json({
        ok: true,
        Hospitales: hospitales
    });
}

const crearHospitales = async (req, res = response) => {

    const uid = req.uid;
    const hospital = new Hospital({
        usuario: uid,
        ...req.body
    });

    try {

        const hospitalDB = await hospital.save();

        res.status(200).json({
            ok: true,
            hospital: hospitalDB
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            mensaje: 'Error inesperado, Hable con el administrador'
        });
    }

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