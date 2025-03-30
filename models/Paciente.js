const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PacienteSchema = new Schema({
  dni: {
    type: String,
    unique: true,
    trim: true
  },// valor unico prestar atencion error si se carga 2 registros con el mismo dni
  nombre: String,
  apellido: String,
  edad: String,
  fecha_nac: Date,
  sexo: String,
  cobertura_soc: String,
  hclinica: String,
  oda_pcte: String,
  odi_pcte: String,
  domicilio_pcte: String,
  numero_dom: Number,
  man_dom: Number,
  lote_dom: Number,
  diagnosticos: [{
    tipo: {
      type: String,

      default: ''
    },
    descripcion: String,
    fecha: Date
  }],


}, { timestamps: true });


module.exports = mongoose.model('Paciente', PacienteSchema);