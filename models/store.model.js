const mongoose = require('mongoose');

//Modelo de tienda
const StoreModelSchema = new mongoose.Schema({
	/*Ejemplo:
	Nombre:{
	type: (variable),
	required: (boolean),
	default: (valor),\
	unique: (boolean) }*/

	//Nombre de usuario
	username : { type: String, default: "tienda" },
	//Nombre de tienda
	storename : { type: String, required: true, unique: true },
	//Password
	password : { type: String, required: true },
	//Datos de clientes
	clientsdata : { type: Object, default: {} },
	//Creditos activos
	creditsactive : { type: Object, default: {} },
	//Creditos terminados
	creditsfinished : { type: Object, default: {} },
	//Reviews hechas
	reviews : { type: Object, default: {} },
	//Historial
	historial : { type: Object, default: {} }
});

module.exports = mongoose.model('StoreModel', StoreModelSchema);