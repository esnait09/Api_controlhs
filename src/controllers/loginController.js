const pool = require('../db');

exports.login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Por favor, ingrese tanto el usuario como la contraseña' });
  }

  try {
    const query = 'SELECT * FROM users WHERE username = $1 AND password = $2';
    const values = [username, password];
    const result = await pool.query(query, values);

    if (result.rows.length > 0) {
      res.json({ message: 'Acceso concedido' });
    } else {
      res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
    }
  } catch (err) {
    console.error('Error en la consulta a la base de datos:', err);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};