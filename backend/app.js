const express = require('express');
const cors = require('cors');

console.log("APP PRINCIPAL CARGADO ");

const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', authRoutes);

// 🔥 TEST DIRECTO SIN ROUTES
app.get('/test-directo', (req, res) => {
    res.send("FUNCIONA APP ");
});

app.listen(3000, () => {
    console.log('Servidor en http://localhost:3000');
});