const express = require('express');
const pacienteController = require('../controllers/pacienteController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Proteger las rutas con el middleware
router.get('/pacientes', authMiddleware, pacienteController.getAll);
router.get('/paciente/:id', authMiddleware, pacienteController.getOne);
router.post('/paciente', authMiddleware, pacienteController.save);
router.put('/paciente/:id', authMiddleware, pacienteController.update);
router.delete('/paciente/:id', authMiddleware, pacienteController.delete);

module.exports = router;