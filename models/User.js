const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['medico', 'recepcionista', 'admin'], // Roles permitidos
        default: 'recepcionista' // Rol por defecto
    }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
