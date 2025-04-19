const { Schema, model } = require('mongoose');

const camaSchema = new Schema({
    numero: { 
        type: String, 
        required: true // Número de cama
    },
    sala: { 
        type: Schema.Types.ObjectId, 
        ref: 'Sala', // Relación con el modelo Sala
        required: true 
    },
    estado: {
        type: String,
        enum: ['disponible', 'ocupada', 'en mantenimiento'],
        default: 'disponible'
    }
}, { timestamps: true });

module.exports = model('Cama', camaSchema);