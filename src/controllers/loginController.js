const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Importa el paquete de JWT
const pool = require('./db');

const SECRET_KEY = 'your_secret_key'; // Clave secreta para firmar el token, debe ser segura y secreta

exports.login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Por favor, ingrese tanto el usuario como la contraseña' });
  }

  try {
    // Buscar el usuario en la base de datos
    const query = 'SELECT * FROM users WHERE username = $1';
    const values = [username];
    const result = await pool.query(query, values);

    if (result.rows.length > 0) {
      // Obtener el hash almacenado
      const user = result.rows[0];
      const hashedPassword = user.password;

      // Comparar la contraseña proporcionada con el hash almacenado
      const match = await bcrypt.compare(password, hashedPassword);

      if (match) {
        // Generar el token JWT
        const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });

        // Enviar el token al cliente
        res.json({ message: 'Acceso concedido', token });
      } else {
        res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
      }
    } else {
      res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
    }
  } catch (err) {
    console.error('Error en la consulta a la base de datos:', err.message || err);
    res.status(500).json({ success: false, message: 'Error en el servidor', error: err.message });
  }
};
