const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const passkey = process.env.PASSKEY;
const UserModel = require('../models/user.model');

router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    if(!username || !password) return res.status(404).json({ message: "Datos no ingresados" });

    const verify = await UserModel.findOne({ username : username });
    if(verify) return res.status(500).json({ message: "Cuenta ya existente" });

    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new UserModel({
      usertag: username,
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
    const { usertag, password } = req.body;

    const userdata = await UserModel.findOne({ usertag : usertag });
    if(!userdata) return res.status(404).json({ message: "La cuenta no existe" });

    const isMatch = await bcrypt.compare(password, userdata.password);
    if(!isMatch) return res.status(401).json({ message: "Contraseñas incorrectas" });

    const token = jwt.sign({ id: userdata._id }, passkey, { expiresIn :'168h' });

    res.status(200).json({ message: "Inicio de sesión exitoso", token: token })
  } catch (error) {
    res.status(500).json({ message: "Ha ocurrido un error en el servidor", error: error.message });
  }
});


router.put('/update', async (req, res) => {
  try {
    const { password } = req.body;
    const token = req.headers.authorization;

    const decode = jwt.verify(token, passkey);
    const userdata = await UserModel.findById(decode.id);
    if(!userdata) return res.status(404).json({ message: "Usuario no encontrado" });
    const username = userdata.username;

    if(!username && !password) return res.status(404).json({ message: "Datos no ingresados" });

    const isMatch = await bcrypt.compare(password, userdata.password);
    if(!isMatch) return res.status(401).json({ message: "Contraseñas incorrectas" });

    const salt = 10;
    const passwordHashed = bcrypt.hash(password, salt)
    
    await UserModel.updateOne({username: username}, {username : username, password : passwordHashed});

    return res.status(200).json({ message: "Datos actualizados con exito" });
  } catch (error) {
    res.status(500).json({ message: "Ha ocurrido un error en el servidor", error: error.message });
  }
});

router.delete('/delete', async (req, res) => {
  try {
    const token = req.headers.authorization;

    const decode = jwt.verify(token, passkey);
    const userdata = await UserModel.findById(decode.id);
    if(!userdata) return res.status(404).json({ message: "Usuario no encontrado" });

    await UserModel.findByIdAndDelete(decode.id);

    res.status(200).json({ message: "Cuenta borrada con exito" });
  } catch (error) {
    res.status(500).json({ message: "Ha ocurrido un error en el servidor", error: error.message });
  }
});

router.get('/get', async (req, res) => {
  try {
    const users = await UserModel.find();

    res.status(200).json({ message: "Datos obtenidos", data: users });
  } catch (error) {
    res.status(500).json({ message: "Ha ocurrido un error en el servidor", error: error.message });
  }
});

router.get('/get/:id', async (req, res) => {
  try {
    const id = req.params;

    const user = await UserModel.findById(id);
    if(!user) return res.status(404).json({ message: "La cuenta no existe"});

    res.status(200).json({ message: "Datos obtenidos", data: user });
  } catch (error) {
    res.status(500).json({ message: "Ha ocurrido un error en el servidor", error: error.message });
  }
});

module.exports = router;
