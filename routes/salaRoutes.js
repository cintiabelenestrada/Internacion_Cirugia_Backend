const express = require('express');
const salaController = require('../controllers/salaController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Obtener todas las salas
router.get('/salas', salaController.getAllSalas);
router.get('/sala/:id', authMiddleware, salaController.getOne); // Obtener una sala por ID
router.post('/sala', authMiddleware, salaController.save); // Crear una nueva sala
router.put('/sala/:id', authMiddleware, salaController.update); // Actualizar una sala por ID
router.delete('/sala/:id', authMiddleware, salaController.delete); // Eliminar una sala por ID

module.exports = router;