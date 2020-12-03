const { response } = require('express');
const Medico = require('../models/medico');

const getMedicos = async (req, res = response) => {

    const medico = await Medico.find()
        .populate('usuario', 'nombre img')
        .populate('hospital', 'nombre img');

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

const actualizarMedico = async (req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const medico = await Medico.findById(id);

        // Si no existe
        if (!medico) {
            return res.status(404).json({
                ok: false,
                mensaje: 'No existe un medico con ese id'
            });
        }

        // Actualizar
        const cambiosMedico = {
            ...req.body,
            usuario: uid
        }

        const medicoActualizado = await Medico.findByIdAndUpdate(id, cambiosMedico, { new: true });


        res.status(200).json({
            ok: true,
            Medico: medicoActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            mensaje: 'Error inesperado, Hable con el administrador'
        })
    }
}

const borrarMedico = async(req, res = response) => {
    const id = req.params.id;

    try {

        const medico = await Medico.findById(id);

        // Si no existe
        if (!medico) {
            return res.status(404).json({
                ok: false,
                mensaje: 'No existe un medico con ese id'
            });
        }

        await Medico.findOneAndDelete(id);

        res.status(200).json({
            ok: true,
            mensaje: 'Medico Eliminado'
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
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}