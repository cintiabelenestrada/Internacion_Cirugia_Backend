const express = require('express');
const camaController = require('../controllers/camaController');
const pacienteController = require('../controllers/pacienteController'); // Para buscar pacientes

const router = express.Router();

// Get all camas
router.get('/camas/', camaController.getCamas);

// Get a single cama by ID
router.get('/cama/:id', camaController.getCamaById);

// Create a new cama
router.post('/cama/', camaController.createCama);

// Update a cama by ID
router.put('/cama/:id', camaController.updateCama);

// Delete a cama by ID
router.delete('/cama/:id', camaController.deleteCama);

// Obtener todas las camas de una sala (sin protección)
router.get('/camas/sala/:sala', camaController.getCamasPorSala);

// Verificar si una cama está disponible (sin protección)
router.get('/cama/:numero/sala/:sala', camaController.verificarCama);

// Buscar un paciente por nombre o número de cama (sin protección)
router.get('/paciente/buscar', pacienteController.buscarPaciente);

module.exports = router;