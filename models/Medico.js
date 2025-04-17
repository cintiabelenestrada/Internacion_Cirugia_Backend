const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MedicoSchema = new Schema({
  apellido: String,
  nombre: String,
  cuil: {
    type: String,
    unique: true,
    trim: true
  }, // valor unico prestar atencion error si se carga 2 registros con el mismo cuil
},
);

module.exports = mongoose.model('Medico', MedicoSchema);
