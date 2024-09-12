const pool = require('../db');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
exports.submitMachine = async (req, res) => {
  const { responsable, numero_maquina, hp, tipo } = req.body;
 console.log(req.body);
  if (!responsable || !numero_maquina || !hp || !tipo) {
    return res.status(400).json({message:'Por favor, complete todos los campos'});
  }

  try {
    const query = 'INSERT INTO machines (responsable, numero_maquina, hp, tipo) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [responsable, numero_maquina, hp, tipo];
    const result = await pool.query(query, values);
    let flowFile = '';
    if (tipo === 'MAM 6090') {
      flowFile = 'flowMam.json';
      flowId = '273e9ee82f847b63';
    } else if (tipo === 'AirMaster') {
      flowFile = 'flowAir.json';
      flowId = 'aaa878';
    } else if (tipo === 'Fijo') {
      flowFile = 'flowFijo.json';
      flowId = 'qweqew82279';
    }

    if (flowFile) {
      const flowPath = path.join(__dirname, '..', 'flows', flowFile);
      const flowData = JSON.parse(fs.readFileSync(flowPath, 'utf8'));

      const nodeRedResponse = await axios.put(`http://175.10.0.106:1880/flow/${flowId}`, flowData, {
        headers: { 'Content-Type': 'application/json' }
      });
      console.log('Respuesta de Node-RED:', nodeRedResponse.data);
    }
    res.status(201).json({message: 'Listo para iniciar prueba'});
  } catch (err) {
    console.error('Error en la inserción en la base de datos:', err);
    res.status(500).json({message:'Error en el servidor'});
  }
};