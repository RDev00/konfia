//Conexion con la base de datos
const supabase = require('../client/supabaseClient');
//Configuracion
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
require('dotenv').config();
const key = process.env.SECRET_KEY;

//Ruta de registro
router.post('/register', async (req, res) => {
	//Uso de try en cualquier caso que ocurra un error
	try {
		//Obtenemos los datos registrados
		const { usertag, password, store } = req.body;

		//Verificamos que haya llegado con exito
		if(!usertag || !password || !store) return res.status(404).json({ message: "Datos faltantes" });

		//Hasheamos la password
		const salt = 10;
		const passwordHashed = await bcrypt.hash(password, salt);

		//Verificamos si existe la tienda
		const { data: users, error: existsError } = await supabase
    .from('users')
    .select('*')
    .eq('store', store);

    //Si existe retornamos error
    if(users.length >= 1) return res.status(500).json({ message: "El usuario ya existe" });

    //De lo contrario guardamos los datos
    const { data, error } = await supabase
    //Seleccionamos la tabla
    .from('users')
    //Insertamos los datos
    .insert([
        { usertag: usertag, password: passwordHashed, store: store }
    ])
    //Los seleccionamos para despues retornarlos
    .select();

    //Si ocurre un error lo notificamos
    if(error) return res.status(500).json({ message: "Ha ocurrido un error al crear tu cuenta", details: error.message });

    //Sino retornamos los datos y los registramos como guardados
    res.status(200).json({ message: "Cuenta creada con exito", userinfo: data });

	} catch(error) {
		//Retornamos posible error del servidor
		res.status(500).json({ message: "Ha ocurrido un error con el servidor", error: error.message });
	}
});

//Ruta de login
//Debido a que es lo mismo solo explicare lo nuevo
router.post('/login', async (req, res) => {
	try {
		const { store, password } = req.body;
		
		if(!store || !password) return res.status(404).json({ message: "Datos faltantes" });

		const { data: user, error: falseExists } = await supabase
    .from('users')
    .select('*')
    .eq('store', store);

    if(falseExists) return res.status(404).json({ message: "Tienda inexistente" });

    //Comparamos las passwords debido a que son inhasheables con [0] seleccionando el primer dato (y el unico)
    const passwordMatch = await bcrypt.compare(password, user[0].password);

    if(!passwordMatch) return res.status(401).json({ message: "Identificaciones invalidas" });

    //Creamos un nuevo token que expira en 1 semana
    const newToken = jwt.sign({ store }, key, { 'expiresIn' : '168h' });

    res.status(200).json({ message: "Inicio de sesion exitoso", token: newToken })
	} catch (error) {
		res.status(500).json({ message: "Ha ocurrido un error con el servidor", error: error.message });
	}
})

module.exports = router;