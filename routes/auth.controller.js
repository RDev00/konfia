const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const passkey = process.env.PASSKEY;
const UserModel = require('../models/user.model');

router.post('/register', async (req, res) => {
  try {
    const { username, usertag, password } = req.body;
    if(!usertag || !password) return res.status(404).json({ message: "Datos no ingresados" });

    const verify = await UserModel.findOne({ usertag : usertag });
    if(verify) return res.status(500).json({ message: "Cuenta ya existente" });

    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new UserModel({
      username: username,
      usertag: usertag,
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
    const { username, password, currentPassword } = req.body;
    const token = req.headers.authorization;

    const decode = jwt.verify(token, passkey);
    const userdata = await UserModel.findById(decode.id);
    if(!userdata) return res.status(404).json({ message: "Usuario no encontrado" });

    if(!currentPassword) return res.status(401).json({ message: "No se ingreso la contraseña" });

    const isMatch = await bcrypt.compare(currentPassword, userdata.password);
    if(!isMatch) return res.status(401).json({ message: "Contraseñas incorrectas" });

    if(username && !password) {
      await UserModel.updateOne({username: userdata.username}, {username : username});
    };

    if(!username && password) {
      const salt = 10;
      const passwordHashed = bcrypt.hash(password, salt);

      await UserModel.updateOne({username: userdata.username}, {password : passwordHashed});
    };

    if(username && password) {
      const salt = 10;
      const passwordHashed = bcrypt.hash(password, salt);

      await UserModel.updateOne({username: userdata.username}, {username: username, password : passwordHashed});
    };

    return res.status(200).json({ message: "Datos actualizados con exito" });
  } catch (error) {
    res.status(500).json({ message: "Ha ocurrido un error en el servidor", error: error.message });
  }
});

router.delete('/delete', async (req, res) => {
  try {
    const token = req.headers.authorization;
    const { password } = req.body;

    const decode = jwt.verify(token, passkey);
    const userdata = await UserModel.findById(decode.id);
    if(!userdata) return res.status(404).json({ message: "Usuario no encontrado" });

    const isMatch = await bcrypt.compare(password, userdata.password);
    if(!isMatch) return res.status(401).json({ message: "Contraseñas incorrectas" });

    await UserModel.findByIdAndDelete(decode.id);

    res.status(200).json({ message: "Cuenta borrada con exito" });
  } catch (error) {
    res.status(500).json({ message: "Ha ocurrido un error en el servidor", error: error.message });
  }
});

router.get('/get', async (req, res) => {
  try {
    const token = req.headers.authorization;
    const { id } = req.query;

    if (token) {
      const decoded = jwt.verify(token, passkey);

      const userdata = await UserModel.findById(decoded.id);
      if (!userdata)
        return res.status(404).json({ message: "Usuario no encontrado" });

      return res.status(200).json({
        message: "Datos del usuario obtenidos con éxito",
        user: userdata
      });
    }

    if (id) {
      const userdata = await UserModel.findById(id);
      if (!userdata)
        return res.status(404).json({ message: "La cuenta no existe" });

      return res.status(200).json({
        message: "Cuenta obtenida con éxito",
        user: userdata
      });
    }

    const users = await UserModel.find();
    return res.status(200).json({
      message: "Datos obtenidos",
      users: users
    });

  } catch (error) {
    return res.status(500).json({
      message: "Ha ocurrido un error en el servidor",
      error: error.message
    });
  }
});


module.exports = router;
