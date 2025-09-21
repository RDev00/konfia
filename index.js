//Configuracion
const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const app = express();

//Rutas
const auth = require('./routes/auth.controller.js');

//Puerto
const port = process.env.PORT;

//Configuracion
app.use(express.json());
app.use(cors());

//Seccion de cuentas
app.use('/account', auth);

//Verificacon
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Error interno del servidor' });
});

//Abertura de puerto
app.listen(port, () => {
	console.log(`Servidor escuchando en: ${port}`);
});