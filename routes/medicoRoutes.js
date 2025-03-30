const express = require('express');
const medicoController = require('../controllers/medicoController');

const router = express.Router();

// Ruta para obtener todos los médicos
router.get('/medicos/', medicoController.getAll);

// Ruta para obtener un médico por ID
router.get('/medico/:id', medicoController.getOne);

// Ruta para crear un nuevo médico
router.post('/medico/', medicoController.save);

// Ruta para actualizar un médico por ID
router.put('/medico/:id', medicoController.update);

// Ruta para eliminar un médico por ID
router.delete('/medico/:id', medicoController.delete);

module.exports = router;