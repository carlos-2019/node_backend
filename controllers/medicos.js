const { response } = require('express');
const Medico = require('../models/medico');

const getMedicos = async (req, res = response) => {

    const medico = await Medico.find()
        .populate('usuario','nombre img')
        .populate('hospital','nombre img');

    res.status(200).json({
        ok: true,
        Medico: medico
    });
}

const crearMedico = async (req, res = response) => {

    const uid = req.uid;
    const medico = new Medico({
        usuario: uid,
        ...req.body
    });
    try {
        const medicoDB = await medico.save();
        res.status(200).json({
            ok: true,
            medico: medicoDB
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            mensaje: 'Error inesperado, Hable con el administrador'
        });
    }
}

const actualizarMedico = (req, res = response) => {
    res.status(200).json({
        ok: true,
        mensaje: 'actualizar Medico'
    });
}

const borrarMedico = (req, res = response) => {
    res.status(200).json({
        ok: true,
        mensaje: 'eliminando Medico'
    });
}



module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}