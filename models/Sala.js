const { Schema, model } = require('mongoose');

const salaSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        unique: true,
        enum: ['UTI', 'SALA 6', 'SALA 7', 'PROVISORIOS'] // Opciones válidas
    },
    tipo: {
        type: String,
        enum: ['hombres', 'mujeres', 'mixto'], // Tipo de sala
        required: true
    },
    maxCamas: {
        type: Number,
        required: true // Número máximo de camas en la sala
    }
}, { timestamps: true });

module.exports = model('Sala', salaSchema);