const { response } = require('express');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const Usuario = require('../models/usuario');

const getUsuarios = async (req, res) => {

    const usuario = await Usuario.find({}, 'nombre email role google');

    res.status(200).json({
        ok: true,
        mensaje: 'Obteniendo Usuarios',
        usuario: usuario,
        uid: req.uid
    });
}

const crearUsuario = async (req, res = response) => {

    const { email, password } = req.body;

    try {
        const existeEmail = await Usuario.findOne({ email });

        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El correo ya esta registrado'
            });
        }
        const usuario = new Usuario(req.body);

        // Encriptar contraseña hash de 1 sola via
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);
        // Guardar Usuario
        await usuario.save();

        //Generando Token
        const token = await generarJWT(usuario.id);

        res.status(201).json({
            ok: true,
            usuario: usuario,
            mensaje: 'Creando Usuario',
            token: token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            mensaje: 'Error Inesperado revisar log'
        });
    }
}

const actualizarUsuario = async (req, res = response) => {

    const uid = req.params.id;

    try {
        const usuarioDB = await Usuario.findById(uid);
        // Verificar si existe el usuario
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                mensaje: 'No existe un usuario por ese id'
            });
        }

        // Actualizaciones
        // PARA NO MOSTRAR ESOS CAMPOS y asi no se tenga que actualizar
        const { password, google, email, ...campos } = req.body;
        //SI ES DIFERENTE 
        if (usuarioDB.email !== email) {

            const existeEmail = await Usuario.findOne({ email });
            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Ya existe un usuario con ese email'
                });
            }
        }

        campos.email = email;

        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true });

        res.status(200).json({
            ok: true,
            usuario: usuarioActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            mensaje: 'Error inesperado'
        });
    }
}

const borrarUsuario = async (req, res = response) => {

    const uid = req.params.id;

    try {
        const usuarioDB = await Usuario.findById(uid);
        // Verificar si existe el usuario
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                mensaje: 'No existe un usuario por ese id'
            });
        }

        await Usuario.findByIdAndDelete(uid);

        res.status(200).json({
            ok: true,
            mensaje: 'Usuario Eliminado',
            usuarioEliminado: usuarioDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            mensaje: 'Error inesperado'
        });
    }
}

module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
}