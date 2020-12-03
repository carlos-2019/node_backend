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

const actualizarHospitales = async (req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const hospital = await Hospital.findById(id);

        // Si no existe
        if (!hospital) {
            return res.status(404).json({
                ok: false,
                mensaje: 'No existe un hospital con ese id'
            });
        }

        // Actualizar
        const cambiosHospital = {
            ...req.body,
            usuario: uid
        }

        const hospitalActualizado = await Hospital.findByIdAndUpdate(id, cambiosHospital, { new: true });


        res.status(200).json({
            ok: true,
            hospital: hospitalActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            mensaje: 'Error inesperado, Hable con el administrador'
        })
    }
}

const borrarHospitales = async (req, res = response) => {

    const id = req.params.id;

    try {

        const hospital = await Hospital.findById(id);

        // Si no existe
        if (!hospital) {
            return res.status(404).json({
                ok: false,
                mensaje: 'No existe un hospital con ese id'
            });
        }

        await Hospital.findOneAndDelete(id);

        res.status(200).json({
            ok: true,
            mensaje: 'Hospital Eliminado'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            mensaje: 'Error inesperado, Hable con el administrador'
        })
    }
}



module.exports = {
    getHospitales,
    crearHospitales,
    actualizarHospitales,
    borrarHospitales
}