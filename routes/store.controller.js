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
    const { username, password, currentPassword } = req.body;
    const token = req.headers.authorization;

    if (!token) return res.status(401).json({ message: "Token no proporcionado" });

    const decode = jwt.verify(token, passkey);
    const storedata = await StoreModel.findById(decode.id);
    if (!storedata) return res.status(404).json({ message: "Tienda no encontrada" });

    const isMatch = bcrypt.compare(currentPassword, storedata.password);
    if(!isMatch) return res.status(401).json({ message: "Contraseñas incorrectas" });

    if (!username && !password) {
      return res.status(400).json({ message: "Datos no ingresados" });
    }

    if (password) {
      if (!currentPassword) {
        return res.status(400).json({ message: "Debe ingresar la contraseña actual para cambiarla" });
      }

      const isMatch = await bcrypt.compare(currentPassword, storedata.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Contraseña actual incorrecta" });
      }
    }

    const updateData = {};

    if (username) updateData.username = username;
    if (password) {
      const saltRounds = 10;
      updateData.password = await bcrypt.hash(password, saltRounds);
    }

    await StoreModel.updateOne({ _id: storedata._id }, updateData);

    return res.status(200).json({ message: "Datos actualizados con éxito" });

  } catch (error) {
    res.status(500).json({
      message: "Ha ocurrido un error en el servidor",
      error: error.message
    });
  }
});

router.delete('/delete', async (req, res) => {
  try {
    const token = req.headers.authorization;
    const { password } = req.body;

    const decode = jwt.verify(token, passkey);
    const storedata = await StoreModel.findById(decode.id);
    if(!storedata) return res.status(404).json({ message: "Tienda no encontrada" });

    const isMatch = await bcrypt.compare(password, storedata.password);
    if(!isMatch) return res.status(401).json({ message: "Contraseñas incorrectas" });

    await StoreModel.findByIdAndDelete(decode.id);

    res.status(200).json({ message: "Cuenta borrada con exito" });
  } catch (error) {
    res.status(500).json({ message: "Ha ocurrido un error en el servidor", error: error.message });
  }
});

router.get('/get', async (req, res) => {
  try {
    const token = req.headers.authorization;
    const { id } = req.query;
    
    if(token) {
      const decode = jwt.verify(token, passkey);
      const storedata = await StoreModel.findById(decode.id);

      if(!storedata) return res.status(404).json({ message: "Tienda no encontrada" });

      return res.status(200).json({ message: "Tienda obtenida", store: storedata })
    }

    if(id) {
      const storedata = await StoreModel.findById(id);
      if(!storedata) return res.status(404).json({ message: "Tienda no encontrada" });

      return res.status(200).json({ message: "Tienda obtenida", store: storedata });
    }

    const stores = await StoreModel.find();
    return res.status(200).json({ message: "Datos obtenidos", stores: stores });
  
  } catch (error) {
    res.status(500).json({ message: "Ha ocurrido un error en el servidor", error: error.message });
  }
});

module.exports = router;
