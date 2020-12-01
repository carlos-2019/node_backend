const { response } = require('express');

const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');

const buscarTodo = async (req, res = response) => {

    const busqueda = req.params.busqueda;
    const regex = RegExp(busqueda, 'i');

    const [usuarios, medicos, hospitales] = await Promise.all([
        Usuario.find({
            nombre: regex
        }),
        Medico.find({
            nombre: regex
        }),
        Hospital.find({
            nombre: regex
        })
    ]);

    res.status(200).json({
        ok: true,
        usuarios,
        medicos,
        hospitales
    });
}

const buscarPorColeccion = async (req, res = response) => {
    const tabla = req.params.tabla;
    const busqueda = req.params.busqueda;
    const regex = RegExp(busqueda, 'i');

    let data = [];

    switch (tabla) {
        case 'medicos':
            data = await Medico.find({ nombre: regex })
                .populate('usuario', 'nombre img')
                .populate('hospital', 'nombre img');
            break;

        case 'hospitales':
            data = await Hospital.find({ nombre: regex })
                .populate('usuario', 'nombre img');
            break;

        case 'usuarios':
            data = await Usuario.find({ nombre: regex });
            break;

        default:
            return res.status(400).json({
                ok: false,
                mensaje: 'La tabla tiene que ser usuarios/medicos/hospitales'
            });

    }
    res.json({
        ok: true,
        resultados: data
    });
}

module.exports = {
    buscarTodo,
    buscarPorColeccion
}
