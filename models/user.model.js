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
	storescomments : { type: Object, default: { "comments": {} } },
	//Creditos activos
	creditsactive : { type: Object, default: { "credits" : {} } },
	//Creditos terminados
	creditsfinished : { type: Object, default: { "credits" : {} } },
	//Historial
	historial : { type: Object, default: { "data" : [] } },
});

module.exports = mongoose.model('UserModel', UserModelSchema);