const express = require('express');
const pacienteController = require('../controllers/pacienteController');

const router = express.Router();

// Rutas para la gestión de pacientes (sin protección)
router.get('/pacientes', pacienteController.getAll); // Listar todos los pacientes
router.get('/paciente/:id', pacienteController.getOne); // Obtener un paciente por ID
router.post('/paciente', pacienteController.save); // Crear un nuevo paciente
router.put('/paciente/:id', pacienteController.update); // Actualizar un paciente por ID
router.delete('/paciente/:id', pacienteController.delete); // Eliminar un paciente por ID

// Rutas de consultas rápidas (sin protección)
router.get('/pacientes', pacienteController.getPacientesPorSala); // Buscar pacientes por sala
router.get('/paciente/cama/:numeroCama/sala/:sala', pacienteController.getPacientePorCamaYSala); // Buscar paciente por cama y sala
router.get('/paciente/buscar', pacienteController.buscarPacientePorNombre); // Buscar pacientes por nombre

module.exports = router;