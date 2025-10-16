const mongoose = require('mongoose');
  /*Ejemplo:
  Nombre:{
  type: (variable),
  required: (boolean),
  default: (valor),\
  unique: (boolean) }*/

const BaseModelSchema = new mongoose.Schema({
  stringField: { type: String, required: true },              // Cadena de texto
  numberField: { type: Number, default: 0 },                  // Número
  booleanField: { type: Boolean, default: false },            // Booleano
  dateField: { type: Date, default: Date.now },               // Fecha
  arrayField: [{ type: String }],                             // Array de strings
  objectField: {                                              // Objeto anidado
    subString: { type: String },
    subNumber: { type: Number }
  },
  mixedField: { type: mongoose.Schema.Types.Mixed },          // Tipo mixto (puede ser cualquier cosa)
  objectIdField: { type: mongoose.Schema.Types.ObjectId, ref: 'OtherModel' }, // Referencia a otro modelo
  bufferField: { type: Buffer },                              // Buffer (datos binarios)
  decimalField: { type: mongoose.Schema.Types.Decimal128 },   // Decimal de alta precisión
  mapField: { type: Map, of: String },                       // Mapa de pares clave-valor (ambas string)
  enumField: { type: String, enum: ['opcion1', 'opcion2'] }, // Enum (valores restringidos)
},
{
  timestamps: true // Crea automáticamente campos createdAt y updatedAt
});

module.exports = mongoose.model('BaseModel', BaseModelSchema);