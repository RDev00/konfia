const mongoose = require('mongoose');

//Modelo de tienda
const CreditModelSchema = new mongoose.Schema({

	//Correo de la tienda
	storename : { type: String, required: true },
	//Id del usuario
	userId : { type: String, required: true },
	//Nombre del usuario
	username : { type: String, required: true },
	//Actividad
	isActive : { type: Boolean, default: true },
	//Cantidad de credito base
	credit : { type: Number, required: true },
	//Cantidad de pago actual
	payment : { type: Number, default: 0.0 }
});

module.exports = mongoose.model('CreditModel', CreditModelSchema);