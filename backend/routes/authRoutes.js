const express = require('express');
const router = express.Router();
const db = require('../config/db');
console.log("RUTAS CARGADAS 🔥");
router.get('/test', (req, res) => {
    res.send("FUNCIONA 🔥");
});

const { login, register } = require('../controllers/authController');

// LOGIN
router.post('/login', login);

// REGISTRO
router.post('/register', register);

// 🔥 ACTUALIZAR DATOS (LO CONSERVAMOS)
router.post('/update', (req, res) => {
    const { cedula, telefono, direccion } = req.body;

    db.query(
        'UPDATE usuarios SET Telefono=?, Direccion=? WHERE CedulaUsuario=?',
        [telefono, direccion, cedula],
        (err) => {
            if (err) return res.status(500).json(err);

            res.json({ msg: 'ok' });
        }
    );
});

// 🔥 OBTENER USUARIO (ESTA ES LA CLAVE)
router.get('/user/:cedula', (req, res) => {

    const cedula = req.params.cedula;

    db.query(
        'SELECT * FROM usuarios WHERE CedulaUsuario = ?',
        [cedula],
        (err, results) => {

            if (err) return res.status(500).json(err);

            if (results.length === 0) {
                return res.status(404).json({ msg: 'Usuario no encontrado' });
            }

            res.json(results[0]);
        }
    );
});

module.exports = router;