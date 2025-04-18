const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Rutas para gestionar usuarios
router.get('/users', authMiddleware, userController.getAll); // Obtener todos los usuarios
router.get('/user/:id', authMiddleware, userController.getOne); // Obtener un usuario por ID
router.delete('/user/:id', authMiddleware, userController.delete); // Eliminar un usuario por ID

module.exports = router;