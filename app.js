const express = require('express');
const path = require('path');
const app = express();
const port = 4000; // Cambiar el puerto aquí

app.use(express.json()); // Middleware para parsear JSON

// Middleware para configurar CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    if (req.method === 'OPTIONS') {
        return res.status(204).end(); // No Content
    }
    next();
});

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'src')));

// Rutas (puedes agregar tus rutas aquí)
app.get('/api/login', (req, res) => {
    res.send('API de login');
});

// Ruta para servir el index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'index.html'));
});

// Conexión a la base de datos (ejemplo con PostgreSQL)
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});
