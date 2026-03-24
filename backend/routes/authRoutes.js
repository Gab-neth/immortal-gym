const express = require('express');
const router = express.Router();

const { login, register } = require('../controllers/authController');

router.post('/login', login);
router.post('/register', register);

module.exports = router;

router.post('/update', (req, res) => {
    const { cedula, telefono, direccion } = req.body;

    db.query(
        'UPDATE usuarios SET Telefono=?, Direccion=? WHERE CedulaUsuario=?',
        [telefono, direccion, cedula],
        () => {
            res.json({ msg: 'ok' });
        }
    );
});