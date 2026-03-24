const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'immortal_gym'
});

db.connect(err => {
    if (err) console.log(err);
    else console.log("DB conectada");
});

module.exports = db;