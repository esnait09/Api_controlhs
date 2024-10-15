const express = require('express');
const app = express();
const loginRoutes = require('./routes/loginRoutes'); // Importa el archivo de rutas

app.use(express.json()); // Para manejar JSON en las solicitudes
app.use('/api', loginRoutes); // Define el prefijo de la ruta

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
