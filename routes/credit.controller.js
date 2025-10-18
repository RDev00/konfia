const express = require('express');
require('dotenv').config();
const router = express.Router();
const jwt = require('jsonwebtoken');

const StoreModel = require('../models/store.model');
const CreditModel = require('../models/credit.model');
const UserModel = require('../models/user.model');
const passkey = process.env.PASSKEY;

router.post('/create', async (req, res) => {
  try {
    const { user, credit } = req.body;
    const token = req.headers.authorization;

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
      { $push: { clientsdata: { user: userData._id }, creditsactive: { credit: newCredit._id }}
    });

    await UserModel.findByIdAndUpdate(
      userData._id,
      { $push: { credits: newCredit._id }
    });

    res.status(201).json({ message: "Crédito creado exitosamente", credit: newCredit });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ha ocurrido un error en el servidor", error: error.message });
  }
});

router.put('/update', async (req, res) => {
  try {
    const { creditId, payment } = req.body;
    const token = req.headers.authorization;

    const decode = jwt.verify(token, passkey);
    if (!decode) return res.status(401).json({ message: "Credenciales inválidas" });

    const storeData = await StoreModel.findById(decode.id);
    if (!storeData) return res.status(404).json({ message: "Tienda no encontrada" });

    const credit = await CreditModel.findById(creditId);
    if(!credit) return res.status(400).json({ message : "Credito no existente" });

    const userData = await UserModel.findOne({ username: credit.username });
    if(!userData) return res.status(404).json({ message: "Cuenta de usuario no existente" });
    
    const oldPayment = credit.payment || 0;
    const actualPayment = oldPayment + payment;

    if(actualPayment <= credit.credit) {
      await CreditModel.findByIdAndUpdate(
        creditId,
        { $set : { isActive : false, payment : actualPayment } }
      );
      await StoreModel.findByIdAndUpdate(
        decode.id,
        { $push : { historial : { message: "Pago realizado", payment: payment, user: userData.username }, creditsfinished : creditId }
      });
    } else {
      await CreditModel.findByIdAndUpdate(
        creditId,
        { $set : { payment : actualPayment } }
      );
      await StoreModel.findByIdAndUpdate(
        decode.id,
        { $push : { historial : { message: "Pago realizado", payment: payment, user: userData.username } }
      });
    };

    await UserModel.findByIdAndUpdate(
      userData._id,
      { $push : { historial : { message: "Pago realizado", payment: payment, store: storeData.storename } }
    });

    const actualCredit = await CreditModel.findById(creditId);

    res.status(200).json({ message: "Credito actualizado exitosamente", credit: actualCredit });
  } catch (error) {
    res.status(500).json({ message: "Ha ocurrido un error en el servidor", error: error.message });
  }
});

router.get('/get/:id', async (req, res) => {
  try {
    const id = req.params;

    const credit = await CreditModel.findById(id);
    if(!credit) return res.status(404).json({ message: "Credito no encontrado" });

    res.status(200).json({ message: "Credito obtenidos exitosamente", credit: credit });
  } catch (error) {
    res.status(500).json({ message: "Ha ocurrido un error en el servidor", error: error.message });
  }
});

router.get('/get/:user', async (req, res) => {
  try {
    const user = req.params;

    const credit = await CreditModel.find({ username: user });
    if(!credit) return res.status(404).json({ message: "Credito no encontrado" });

    res.status(200).json({ message: "Creditos obtenidos exitosamente", credit: credit });
  } catch (error) {
    res.status(500).json({ message: "Ha ocurrido un error en el servidor", error: error.message });
  }
});

router.get('/get/:store', async (req, res) => {
  try {
    const store = req.params;

    const credit = await CreditModel.find({ store: store });
    if(!credit) return res.status(404).json({ message: "Credito no encontrado" });

    res.status(200).json({ message: "Creditos obtenidos exitosamente", credit: credit });
  } catch (error) {
    res.status(500).json({ message: "Ha ocurrido un error en el servidor", error: error.message });
  }
});

module.exports = router;