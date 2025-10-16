const express = require('express');
require('dotenv').config();
const router = express.Router();
const jwt = require('jsonwebtoken');

const StoreModel = require('../models/store.model');
const UserModel = require('../models/user.model');

const passkey = process.env.PASSKEY;
//Dar reviews a usuarios y tiendas, como poder eliminarlas
//Actualizar la calificacion del usuario y las reviews que tiene este mismo

//Review de tienda
router.post('/review', async (req, res) => {
  try {
    const { user, calification, comment, average } = req.body;
    const token = req.headers.authentification;
    if (!user || !token || !calification || !comment || !average) {
      return res.status(400).json({ message: "No se ingresaron los datos" });
    }

    const exists = await UserModel.findOne({ username: user });
    if (!exists) return res.status(404).json({ message: "Datos no encontrados" });

    const decoded = jwt.verify(token, passkey);
    const store = await StoreModel.findById(decoded.id);
    if (!store) return res.status(401).json({ message: "Identificaciones invalidas" });

    await StoreModel.findByIdAndUpdate(
      store._id,
      { $push: { reviews: { user, calification, comment } } }
    );

    await UserModel.findByIdAndUpdate(
      exists._id,
      { $set: { average: average } }
    );

    res.status(200).json({ message: "Review hecha con exito" });
  } catch (error) {
    res.status(500).json({ message: "Ha ocurrido un error en el servidor", error: error.message });
  }
});

module.exports = router;