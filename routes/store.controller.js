const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const StoreModel = require('../models/store.model');

router.post('/register', async (req, res) => {
  try {
    const { username, storename, password } = req.body;
    if(!storename || !password) return res.status(404).json({ message: "Datos no ingresados" });
    if(!username) return username = null;

    const verify = await StoreModel.findOne({ storename : storename });
    if(verify) return res.status(500).json({ message: "Correo ya existente" });

    const salt = 10;
    const hashedPassword = bcrypt.hash(password, salt);

    const newUser = new StoreModel({
      username: username,
      storename: storename,
      password: hashedPassword
    });

    newUser.save();

    res.status(200).json({ message: "Usuario registrado con existente" });
  } catch (error) {
    res.status(500).json({ message: "Ha ocurrido un error en el servidor", error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { storename, password } = req.body;

    const storeData = await StoreModel.findOne({ storename : storename });
    const isMatch = bcrypt.compare(password, storeData.password);
    if(!isMatch) return res.status(401).json({ message: "Contraseñas incorrectas" });

    res.status(200).json({ message : "Inicio de sesión exitoso" })
  } catch (error) {
    res.status(500).json({ message: "Ha ocurrido un error en el servidor", error: error.message });
  }
})

module.exports = router;