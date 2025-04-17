const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PacienteSchema = new Schema({
  dni: {
    type: String,
    unique: true,
    trim: true, 
    required: true 
  },// valor unico prestar atencion error si se carga 2 registros con el mismo dni
  nombre: {
    type: String,
    required: true // Nombre es obligatorio
  },
  apellido: {
    type: String,
    required: true // Apellido es obligatorio
  },
  edad: {
    type: Number,
    required: true // Edad es obligatoria
  },
  fecha_nac: {
    type: Date,
    required: true // Fecha de nacimiento es obligatoria
  },
  sexo: {
    type: String,
    enum: ['Masculino', 'Femenino', 'Otro'], // Opciones válidas
    required: true
  },

  diagnosticos: [{
    tipo: {
      type: String,
      default: ''
    },
    descripcion: String,
    fecha: Date
  }],

  observaciones: {
    type: String,
    default: '' // Observaciones opcionales
  },
  cama: {
    type: Schema.Types.ObjectId,
    ref: 'Cama', // Relación con el modelo Cama
    default: null
  },
  
  medico: {
    type: Schema.Types.ObjectId,
    ref: 'Medico', // Relación con el modelo Medico
    required: true
  }
}, { timestamps: true });


module.exports = mongoose.model('Paciente', PacienteSchema);