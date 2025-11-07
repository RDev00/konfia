const express = require('express');
require('dotenv').config();
const router = express.Router();
const jwt = require('jsonwebtoken');

const StoreModel = require('../models/store.model');
const UserModel = require('../models/user.model');

const passkey = process.env.PASSKEY;

//Review de tienda a usuario (ambos se guardan)
router.post('/create', async (req, res) => {
  try {
    const { userId, calification, comment } = req.body;
    const token = req.headers.authorization;

    if (!userId || !token || !calification) {
      return res.status(400).json({ message: "No se ingresaron los datos" });
    }

    const userData = await UserModel.findById(userId);
    if (!userData) return res.status(404).json({ message: "Usuario no encontrado" });

    const decoded = jwt.verify(token, passkey);
    const store = await StoreModel.findById(decoded.id);
    if (!store) return res.status(401).json({ message: "Identificaciones inválidas" });

    const totalCalifications = (store.totalCalifications || 0) + 1;
    const totalRateValue = (store.totalRateValue || 0) + calification;
    const average = totalRateValue / totalCalifications;

    await StoreModel.findByIdAndUpdate(
      store._id,
      { $push: { reviews: { userTag: userData.usertag, calification, comment } } }
    );

    await UserModel.findByIdAndUpdate(
      userData._id,
      { $set: { calification: average, totalCalifications, totalRateValue } }
    );

    res.status(200).json({ message: "Review hecha con éxito" });
  } catch (error) {
    res.status(500).json({
      message: "Ha ocurrido un error en el servidor",
      error: error.message
    });
  }
});

module.exports = router;