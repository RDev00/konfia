const mongoose = require('mongoose');

//Modelo de usuario
const UserModelSchema = new mongoose.Schema({
	//Nombre de usuario
	username : { type: String, required: true, unique: true },
	//Password
	password : { type: String, required: true },
	//Calificacion de reviews
	calification : { type: Number, default: 0.0 },
	//Comentarios de tiendas
	storescomments : { type: Object },
	//Creditos activos
	creditsactive : { type: Object },
	//Creditos terminados
	creditsfinished : { type: Object },
	//Historial
	historial : { type: Object },
});

module.exports = mongoose.model('UserModel', UserModelSchema);