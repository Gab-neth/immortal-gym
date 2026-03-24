const db = require('../config/db');

const getUserByCedula = (cedula, callback) => {
    db.query(
        'SELECT * FROM usuarios WHERE CedulaUsuario = ? LIMIT 1',
        [cedula],
        callback
    );
};

const createUser = (data, callback) => {
    db.query(
        'INSERT INTO usuarios (CedulaUsuario, NombreCompleto, password, Estado, Telefono, Direccion) VALUES (?, ?, ?, 1, ?, ?)',
        [data.cedula, data.nombre, data.password, data.telefono, data.direccion],
        callback
    );
};

module.exports = { getUserByCedula, createUser };