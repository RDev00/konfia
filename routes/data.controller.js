//Conexion con la base de datos
const supabase = require('../client/supabaseClient');
//Configuracion
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
require('dotenv').config();
const key = process.env.SECRET_KEY;

//Ruta para subir datos
router.post('/upload', async (req, res) => {
	try {
		const { data } = req.body;

		if(!data) return res.status(404).json({ message: "No hay data ingresada" })

		const token = req.headers.authorization;

		if(!token) return res.status(401).json({ message: "Credenciales no ingresadas" });

		const decode = jwt.verify(token, key);

		if(!decode) return res.status(401).json({ message: "Credenciales invalidas" });

		const store = decode.store;

		const { data: user, error } = await supabase
		.from('users')
		.update({ 'data' : data })
		.eq('store', store)
		.select();

		if(error) return res.status(500).json({ message: "Ha ocurrido un error al subir la data" });

		return res.status(200).json({ message: "Data subida correctamente", user })
	} catch(error) {
		res.status(500).json({ message: "Ha ocurrido un error al subir la data", error: error.message });
	}
})

module.exports = router;