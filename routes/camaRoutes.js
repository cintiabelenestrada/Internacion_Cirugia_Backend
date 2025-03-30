const express = require('express');
const camaController = require('../controllers/camaController');

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

module.exports = router;