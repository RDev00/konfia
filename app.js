//Configuracion
const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
//Agregacion de mongoose para MongoDB
const mongoose = require('mongoose');
const app = express();

//Puerto
const port = process.env.PORT;

const StoreModel = require('./models/store.model.js');
const UserModel = require('./models/user.model');

//Configuracion
app.use(express.json());
app.use(cors());

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