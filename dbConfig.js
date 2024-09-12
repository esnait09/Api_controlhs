const { Client } = require('pg');
const dotenv = require('dotenv');

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

// Configuración de la conexión
const client = new Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

async function insertData() {
  try {
    // Conectarse a la base de datos
    await client.connect();

    // Datos a insertar
    const username = 'Juan'; // Asegúrate de que los valores estén entre comillas
    const password = 'hola'; // Asegúrate de que los valores estén entre comillas

    // Consulta de inserción
    const query = 'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *';
    const values = [username, password];

    // Ejecutar la consulta
    const res = await client.query(query, values);

    // Mostrar los datos insertados
    console.log('Datos insertados:', res.rows[0]);
  } catch (err) {
    // Manejar cualquier error que ocurra
    console.error('Error al insertar datos', err.stack);
  } finally {
    // Asegurarse de desconectarse incluso si ocurre un error
    await client.end();
  }
}

// Ejecutar la función asíncrona
insertData();
