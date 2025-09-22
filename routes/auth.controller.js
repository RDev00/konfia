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
});

// --- NO TESTEADO ---
//Ruta de edicion de cuenta
router.put('/update', async (req, res) => {
	try {
		//Obtenemos los datos que el usuario quiera cambiar
		const [ usertag, password ] = req.body;

		//Obtenemos el token del usuario
		const token = req.headers.authorization;

		if(!token) return res.status(401).json({ message: "Credenciales no ingresadas" });

		//decodificamos el token
		const decode = jwt.verify(token, key);

		//Verificamos que se haya decodificado
		if(!decode) return res.status(401).json({ message: "Credenciales invalidas" });

		//Obtenemos los datos de la tienda
		const store = decode.store;

		//Si el usuario quiere cambiar el nombre de usuario entonces hacemos lo siguiente:
		//Verificamos que quiere cambiar solo el nombre de usuario
		if( usertag ) {
			//Seleccionamos el nombre de la tienda
			const { data: userdata , error: usererror } = await supabase
			.from('users')
			//Lo actualizamos
			.update({ usertag: usertag })
			//Seleccionamos el que sea igual
			.eq('store', store)
			.select();

			if(usererror) return res.status(500).json({ message: "Ha ocurrido un error con el servidor" });

			return res.status(200).json({ message: "Datos actualizados correctamente", data: userdata, newusertag: usertag });
		} else if( password ) {
			//hasheamos la password
			const newSalt = 10;
			const newHashed = await bcrypt.hash(password, newSalt);

			const { data: passworddata , error: passworderror } = await supabase
			.from('users')
			.update({ password: newHashed })
			.eq('store', store)
			.select();

			if(passworderror) return res.status(500).json({ message: "Ha ocurrido un error con el servidor" });

			return res.status(200).json({ message: "Datos actualizados correctamente", data: passworddata, newpassword: password });
		}


	} catch (error) {
		res.status(500).json({ message: "Ha ocurrido un error con el servidor", error: error.message });
	}
});

//Ruta para obtener los usuarios
router.get('/users', async (req, res) => {
	try {
		//Obtenemos todos los datos de users
		const { data, error } = await supabase
		.from('users')
		.select('*');

		if(error) return res.status(500).json({ message: "Ha ocurrido un error con el servidor" });

		res.status(200).json({ message: "Datos obtenidos", users: data });
	} catch (error) {
		res.status(500).json({ message: "Ha ocurrido un error con el servidor", error: error.message });
	}
});

//Ruta para obtener a solo un usuario
router.get('/users/:id', async (req, res) => {
	try {
		const id = req.params;

		const { data, error } = await supabase
		.from('users')
		.eq( 'id': id )
		.select();

		if(error) return res.status(500).json({ message: "Ha ocurrido un error con el servidor" });

		res.status(200).json({ message: "Datos obtenidos", users: data });
	} catch (error) {
		res.status(500).json({ message: "Ha ocurrido un error con el servidor", error: error.message });
	}
});

module.exports = router;