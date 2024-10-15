const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const pool = require('./db'); // Asegúrate de tener tu archivo de configuración de base de datos

const app = express();
const PORT = 3000; // Puedes cambiar el puerto si lo deseas

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Ruta para recibir los datos del formulario
app.post('/api/submit', async (req, res) => {
  const { Nombre_y_Apellido, Tipo_de_proyecto, Descripcion_De_Lo_Realizado, Horas_Diarias_Realizadas, Fecha_Actual } = req.body;

  if (!Nombre_y_Apellido || !Tipo_de_proyecto || !Descripcion_De_Lo_Realizado || !Horas_Diarias_Realizadas || !Fecha_Actual) {
    return res.status(400).json({ message: 'Por favor, complete todos los campos' });
  }

  try {
    const query = `
      INSERT INTO tu_tabla (Nombre_y_Apellido, Tipo_de_proyecto, Descripcion_De_Lo_Realizado, Horas_Diarias_Realizadas, Fecha_Actual) 
      VALUES ($1, $2, $3, $4, $5) RETURNING *
    `;
    const values = [Nombre_y_Apellido, Tipo_de_proyecto, Descripcion_De_Lo_Realizado, Horas_Diarias_Realizadas, Fecha_Actual];

    const result = await pool.query(query, values);
    res.status(201).json({ message: 'Datos guardados correctamente', data: result.rows[0] });
  } catch (err) {
    console.error('Error al guardar en la base de datos:', err);
    res.status(508).json({ message: 'Error en el servidor' });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
