const express = require('express');
const app = express();
const loginRoutes = require('./routes/loginRoutes');
const machineRoutes = require('./routes/machineRoutes');
require('dotenv').config();

app.use(express.json()); // Middleware para parsear JSON

// Middleware para configurar CORS
app.use((req, res, next) => {
let validIps = ['::ffff:175.10.0.174', '::ffff:175.10.0.207']

console.log(req.headers.origin)

if(validIps.includes(req.socket.remoteAddress)){
    res.header('Access-Control-Allow-Origin', '*');
} else {
    const err = new Error('IP NO RECONOCIDA' + req.socket.remoteAddress)
}

res.header('Access-Control-Allow-Methods', 'GET, POST')
res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

next();
})
// Rutas
app.use('/api', loginRoutes);
app.use('/api', machineRoutes);

module.exports = app;