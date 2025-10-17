const express = require('express');
require('dotenv').config();
const router = express.Router();
const jwt = require('jsonwebtoken');

const StoreModel = require('../models/store.model');
const CreditModel = require('../models/credit.model');
const UserModel = require('../models/user.model');
const StoreModel = require('../models/store.model');

const passkey = process.env.PASSKEY;

router.post('/create', async (req, res) => {
  try {
    const { user, credit } = req.body;
    const token = req.headers.authentification;

    const userData = await UserModel.findOne({ username: user });
    if (!userData) return res.status(404).json({ message: "Usuario no existente" });

    const decode = jwt.verify(token, passkey);
    if (!decode) return res.status(401).json({ message: "Credenciales inválidas" });

    const storeData = await StoreModel.findById(decode.id);
    if (!storeData) return res.status(404).json({ message: "Tienda no encontrada" });

    // Crear un nuevo crédito
    const newCredit = new CreditModel({
      store: storeData.storename,
      username: userData.username,
      isActive: true,
      credit: credit,
    });

    await newCredit.save();

    await StoreModel.findByIdAndUpdate(
      storeData._id,
      {
        $push: {
          clientsdata: { user: userData._id },
          creditsactive: { credit: newCredit._id },
        },
      }
    );

    await UserModel.findByIdAndUpdate(
      userData._id,
      { $push: { credits: newCredit._id } }
    );

    res.status(201).json({ message: "Crédito creado exitosamente", credit: newCredit });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ha ocurrido un error en el servidor", error: error.message });
  }
});

module.exports = router;

module.exports = router;