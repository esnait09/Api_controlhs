const express = require('express');
const app = express();
const loginRoutes = require('./routes/loginRoutes');  // Rutas para el login
const machineRoutes = require('./routes/machineRoutes');  // Rutas para las máquinas
require('dotenv').config();  // Cargar variables de entorno desde .env

app.use(express.json()); // Middleware para parsear JSON en las solicitudes

// Middleware para configurar CORS
app.use((req, res, next) => {
    // Permitir solicitudes desde cualquier origen
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    // Manejar preflight requests (OPTIONS)
    if (req.method === 'OPTIONS') {
        return res.status(204).end(); // No Content para OPTIONS
    }

    next();  // Continuar con la siguiente función de middleware
});

// Rutas
app.use('/api/login', loginRoutes);  // Ruta para login
app.use('/api/machines', machineRoutes);  // Ruta para machines

// Exportar la app para usar en otros archivos (ej: server.js)
module.exports = app;
