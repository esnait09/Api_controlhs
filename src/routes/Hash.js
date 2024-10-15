const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 'oreja123'; // Reemplaza esto con la contraseña que quieres probar

bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
  if (err) throw err;
  console.log('Hashed password:', hash);
  // Guarda el hash en la base de datos aquí
});
