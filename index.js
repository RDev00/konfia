//Configuracion
const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
//Agregacion de mongoose para MongoDB
const mongoose = require('mongoose');
const app = express();

//importacion de rutas
const storeroute = require('./routes/store.controller');
const userroute = require('./routes/auth.controller');
const dataroute = require('./routes/data.controller');

//Puerto
const port = process.env.PORT;

//Configuracion
app.use(express.json());
app.use(cors());

//Rutas
app.use('/store', storeroute);
app.use('/users', userroute);
app.use('/data', dataroute);

//Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('Conectado a MongoDB'))
.catch((err) => {
  console.error('Error de conexión a MongoDB:', err);
  process.exit(1); //termina el server si no conecta
});

//Verificacon
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Error interno del servidor' });
});

//Abertura de puerto
app.listen(port, () => {
  console.log(`Servidor escuchando en: ${port}`);
});