const express = require('express');
const Cama = require('../models/Cama');
const Sala = require('../models/Sala');

var camaController = {
    // Get all camas
    getCamas: async (req, res) => {
        try {
            const camas = await Cama.find().populate('sala', 'nombre'); // Opcional: incluir detalles de la sala
            res.status(200).json(camas);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching camas', error });
        }
    },
    // Get a single cama by ID
    getCamaById: async (req, res) => {
        try {
            const cama = await Cama.findById(req.params.id).populate('sala', 'nombre');
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
            const { numero, sala } = req.body;

            // Verificar si la sala existe
            const salaEncontrada = await Sala.findById(sala);
            if (!salaEncontrada) {
                return res.status(404).json({ message: 'Sala no encontrada' });
            }

            // Verificar si ya existe una cama con el mismo número en la misma sala
            const camaExistente = await Cama.findOne({ numero, sala });
            if (camaExistente) {
                return res.status(400).json({ message: 'Ya existe una cama con este número en esta sala' });
            }

            // Contar el número de camas existentes en la sala
            const camasEnSala = await Cama.countDocuments({ sala });
            if (camasEnSala >= salaEncontrada.maxCamas) {
                return res.status(400).json({ message: 'No se pueden agregar más camas a esta sala. Se alcanzó el máximo permitido.' });
            }

            // Crear la nueva cama
            const nuevaCama = new Cama({ numero, sala });
            const camaGuardada = await nuevaCama.save();

            res.status(201).json(camaGuardada);
        } catch (error) {
            console.error('Error al crear la cama:', error);
            res.status(500).json({ message: 'Error al crear la cama', error });
        }
    },

    // Update a cama by ID
    updateCama: async (req, res) => {
        try {
            const camaActualizada = await Cama.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!camaActualizada) {
                return res.status(404).json({ message: 'Cama no encontrada' });
            }
            res.status(200).json(camaActualizada);
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
    },

    // Obtener todas las camas de una sala
    getCamasPorSala: async (req, res) => {
        try {
            const { sala } = req.params;
            const camas = await Cama.find({ sala });
            res.json(camas);
        } catch (error) {
            console.error('Error al obtener las camas:', error);
            res.status(500).json({ message: 'Error al obtener las camas' });
        }
    },

    // Verificar si una cama está disponible
    verificarCama: async (req, res) => {
        try {
            const { numero, sala } = req.params;
            const cama = await Cama.findOne({ numero, sala });

            if (!cama) {
                return res.status(404).json({ message: 'La cama no existe en esta sala' });
            }

            res.json({ 
                numero: cama.numero, 
                sala: cama.sala, 
                estado: cama.estado 
            });
        } catch (error) {
            console.error('Error al verificar la cama:', error);
            res.status(500).json({ message: 'Error al verificar la cama' });
        }
    }
};

module.exports = camaController;








