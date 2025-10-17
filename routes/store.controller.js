const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const passkey = process.env.PASSKEY;
const StoreModel = require('../models/store.model');

router.post('/register', async (req, res) => {
  try {
    const { username, storename, password } = req.body;
    if(!storename || !password) return res.status(404).json({ message: "Datos no ingresados" });
    if(!username) return username = null;

    const verify = await StoreModel.findOne({ storename : storename });
    if(verify) return res.status(500).json({ message: "Cuenta ya existente" });

    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new StoreModel({
      username: username,
      storename: storename,
      password: hashedPassword
    });

    await newUser.save();

    res.status(200).json({ message: "Usuario registrado con exito" });
  } catch (error) {
    res.status(500).json({ message: "Ha ocurrido un error en el servidor", error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { storename, password } = req.body;

    const storeData = await StoreModel.findOne({ storename : storename });
    if(!storeData) return res.status(404).json({ message: "La cuenta no existe" });

    const isMatch = await bcrypt.compare(password, storeData.password);
    if(!isMatch) return res.status(401).json({ message: "Contraseñas incorrectas" });

    const token = jwt.sign({ id: storeData._id }, passkey, { expiresIn :'168h' });

    res.status(200).json({ message: "Inicio de sesión exitoso", token: token })
  } catch (error) {
    res.status(500).json({ message: "Ha ocurrido un error en el servidor", error: error.message });
  }
});

router.put('/update', async (req, res) => {
  try {
    const { username, password } = req.body;
    const token = req.headers.authentification;

    const decode = jwt.verify(token, passkey);
    const storedata = await StoreModel.findById(decode.id);
    if(!storedata) return res.status(404).json({ message: "Tienda no encontrada" });
    const storename = storedata.storename;

    if(!username && !password) return res.status(404).json({ message: "Datos no ingresados" });

    const isMatch = await bcrypt.compare(password, storeData.password);
    if(!isMatch) return res.status(401).json({ message: "Contraseñas incorrectas" });

    if(username && !password) {
      await StoreModel.updateOne({storename : storename}, {username : username});
    } else if(password && !username) {
      const salt = 10;
      const passwordHashed = await bcrypt.hash(password, salt)
      
      await StoreModel.updateOne({storename: storename}, {password : passwordHashed});
    } else {
      const salt = 10;
      const passwordHashed = await bcrypt.hash(password, salt)
      
      await StoreModel.updateOne({storename: storename}, {username : username, password : passwordHashed});
    }

    return res.status(200).json({ message: "Datos actualizados con exito" });
  } catch (error) {
    res.status(500).json({ message: "Ha ocurrido un error en el servidor", error: error.message });
  }
});

router.delete('/delete', async (req, res) => {
  try {
    const token = req.headers.authentification;

    const decode = jwt.verify(token, passkey);
    const storedata = await StoreModel.findById(decode.id);
    if(!storedata) return res.status(404).json({ message: "Tienda no encontrada" });

    await StoreModel.findByIdAndDelete(decode.id);

    res.status(200).json({ message: "Cuenta borrada con exito" });
  } catch (error) {
    res.status(500).json({ message: "Ha ocurrido un error en el servidor", error: error.message });
  }
});

router.get('/get', async (req, res) => {
  try {
    const stores = await StoreModel.find();

    res.status(200).json({ message: "Datos obtenidos", data: stores });
  } catch (error) {
    res.status(500).json({ message: "Ha ocurrido un error en el servidor", error: error.message });
  }
});

router.get('/get/:id', async (req, res) => {
  try {
    const id = req.params;

    const store = await StoreModel.findById(id);
    if(!store) return res.status(404).json({ message: "La cuenta no existe"});

    res.status(200).json({ message: "Datos obtenidos", data: stores });
  } catch (error) {
    res.status(500).json({ message: "Ha ocurrido un error en el servidor", error: error.message });
  }
});

module.exports = router;