const { response } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const { googleverify } = require('../helpers/google-verify');
const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        // Verificar email
        const usuarioDB = await Usuario.findOne({ email });
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                mensaje: 'Correo no valido'
            });
        }

        // Verificar contraseña
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Password no valido'
            });
        }

        // Generar el TOKEN - JWT
        const token = await generarJWT(usuarioDB.id);

        res.status(200).json({
            ok: true,
            token: token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            mensaje: 'Hable con el administrador'
        });
    }
}

const googleSignIn = async (req, res = response) => {

    const googleToken = req.body.token;

    try {

        const { name, email, picture } = await googleverify(googleToken);

        // Verificar si existe el usuario
        const usuarioDB = await Usuario.findOne({ email });
        let usuario;
        if (!usuarioDB) {
            // si no existe el usuario
            usuario = new Usuario({
                nombre: name,
                email,
                password: '@@@',
                img: picture,
                google: true
            });

        }else{
            // existe usuario
            usuario = usuarioDB;
            usuario.google = true;
        }

        // Guardar en DB
        await usuario.save();

        // Generar el TOKEN - JWT
        const token = await generarJWT(usuarioDB.id);

        res.status(200).json({
            ok: true,
            token
        });

    } catch (error) {
        res.status(401).json({
            ok: false,
            mensaje: 'Token no es correcto'
        });
    }

}

module.exports = {
    login,
    googleSignIn
}