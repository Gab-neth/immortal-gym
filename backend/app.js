const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// prefijo /api
app.use('/api', authRoutes);

app.listen(3000, () => {
    console.log('Servidor en http://localhost:3000');
});