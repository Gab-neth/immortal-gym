const db = require('../config/db');

// OBTENER USUARIO
const getUserByCedula = (cedula, callback) => {
    db.query(
        'SELECT * FROM usuarios WHERE CedulaUsuario = ? LIMIT 1',
        [cedula],
        callback
    );
};

// CREAR USUARIO
const createUser = (user, callback) => {
    db.query(
        'INSERT INTO usuarios (NombreCompleto, CedulaUsuario, password, Telefono, Direccion, Estado) VALUES (?, ?, ?, ?, ?, 0)',
        [
            user.nombre,
            user.cedula,
            user.password,
            user.telefono,
            user.direccion
        ],
        (err, result) => {
            if (err){
                console.error("ERROR SQL:", err);
                return callback(err);
            }

            callback(null, result);
        }
    );
};

module.exports = { getUserByCedula, createUser };