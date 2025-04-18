const express = require('express');
const pacienteController = require('../controllers/pacienteController');

const router = express.Router();

// Ruta para obtener todos los pacientes
router.get('/pacientes', pacienteController.getAll);

// Ruta para obtener un paciente por ID
router.get('/paciente/:id', pacienteController.getOne);

// Ruta para obtener un paciente por DNI
router.get('/paciente/dni/:dni', pacienteController.getPacientePorDNI);

// Ruta para crear un nuevo paciente
router.post('/paciente', pacienteController.save);

// Ruta para actualizar un paciente por ID
router.put('/paciente/:id', pacienteController.update);

// Ruta para actualizar diagnósticos y observaciones de un paciente
router.put('/paciente/:id/diagnosticos', pacienteController.actualizarDiagnosticoYObservaciones);

// Ruta para eliminar un paciente por ID
router.delete('/paciente/:id', pacienteController.delete);

module.exports = router;