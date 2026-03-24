const { getUserByCedula, createUser } = require('../models/usuarioModel');

//  LOGIN
exports.login = (req, res) => {
    const { cedula, password } = req.body;

    getUserByCedula(cedula, (err, results) => {

        if (err) return res.status(500).json(err);

        if (results.length === 0) {
            return res.json({ msg: 'Usuario no encontrado' });
        }

        const user = results[0];

        if (user.password !== password) {
            return res.json({ msg: 'Contraseña incorrecta' });
        }

        res.json({ msg: 'ok', user });
    });
};

//  REGISTRO
exports.register = (req, res) => {
    const { nombre, cedula, telefono, direccion, password } = req.body;

    createUser({
        nombre,
        cedula,
        password,
        telefono,
        direccion
    }, (err) => {

        if (err){
            console.error("ERROR REGISTRO:", err);
            return res.status(500).json(err);
        }

        res.json({ msg: 'Usuario creado correctamente' });
    });
};