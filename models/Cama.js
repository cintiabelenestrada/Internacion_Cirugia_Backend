const { Schema, model } = require('mongoose');

const camaSchema = new Schema({
    numero: { type: String, required: true, unique: true },
    sala: { type: String, required: true },
    piso: { type: Number, required: true },
    especialidad: {
        type: String,
        required: true,
        enum: ['UCI', 'Pediatría', 'Cirugía', 'Maternidad', 'General']
    },
    estado: {
        type: String,
        enum: ['disponible', 'ocupada', 'mantenimiento', 'reservada'],
        default: 'disponible'
    },
    paciente: {
        type: Schema.Types.ObjectId,
        ref: 'Paciente',
        default: null
    },
    medico: {
        type: Schema.Types.ObjectId,
        ref: 'Medico',
        default: null
    },
    fechaIngreso: { type: Date, default: null },
    fechaSalida: { type: Date, default: null },
    observaciones: { type: String, default: null },


}, { timestamps: true });

module.exports = model('Cama', camaSchema);