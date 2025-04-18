const express = require('express');
const Cama = require('../models/Cama');

var camaController = {
    // Get all camas
    getCamas: async (req, res) => {
        try {
            const camas = await Cama.find();
            res.status(200).json(camas);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching camas', error });
        }
    },
    // Get a single cama by ID
    getCamaById: async (req, res) => {
        try {
            const cama = await Cama.findById(req.params.id);
            if (!cama) {
                return res.status(404).json({ message: 'Cama not found' });
            }
            res.status(200).json(cama);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching cama', error });
        }
    },

    // Get patient assigned to a specific cama
    getPacientePorCama: async (req, res) => {
        try {
            const cama = await Cama.findOne({ numero: req.params.numero })
                .populate('paciente') // Populate patient details
                .populate('medico'); // Populate doctor details
            if (!cama) {
                return res.status(404).json({ message: 'Cama not found' });
            }
            res.status(200).json(cama);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching cama details', error });
        }
    },

    // Create a new cama
    createCama: async (req, res) => {
        try {
            const newCama = new Cama(req.body);
            const savedCama = await newCama.save();
            res.status(201).json(savedCama);
        } catch (error) {
            res.status(500).json({ message: 'Error creating cama', error });
        }
    },

    // Update a cama by ID
    updateCama: async (req, res) => {
        try {
            const updatedCama = await Cama.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!updatedCama) {
                return res.status(404).json({ message: 'Cama not found' });
            }
            res.status(200).json(updatedCama);
        } catch (error) {
            res.status(500).json({ message: 'Error updating cama', error });
        }
    },

    // Delete a cama by ID
    deleteCama: async (req, res) => {
        try {
            const deletedCama = await Cama.findByIdAndDelete(req.params.id);
            if (!deletedCama) {
                return res.status(404).json({ message: 'Cama not found' });
            }
            res.status(200).json({ message: 'Cama deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting cama', error });
        }
    }
}

module.exports = camaController;








