const { Pool } = require('pg');
const bcrypt = require('bcrypt');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const username = 'laOreja'; // Nombre de usuario que deseas agregar
const plaintextPassword = 'oreja123'; // Contraseña en texto plano que deseas hashear

(async () => {
  try {
    // Generar el hash de la contraseña
    const hashedPassword = await bcrypt.hash(plaintextPassword, 10);

    // Insertar el usuario en la base de datos
    const query = 'INSERT INTO users (username, password) VALUES ($1, $2)';
    const values = [username, hashedPassword];
    await pool.query(query, values);

    console.log('Usuario añadido con éxito');
  } catch (err) {
    console.error('Error al insertar el usuario:', err);
  } finally {
    await pool.end(); // Cerrar la conexión
  }
})();
