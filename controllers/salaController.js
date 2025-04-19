const Sala = require('../models/Sala');

const salaController = {
    // Obtener todas las salas
    getAllSalas: async (req, res) => {
        try {
            const salas = await Sala.find().select('nombre tipo maxCamas');
            res.status(200).json(salas);
        } catch (error) {
            console.error('Error al obtener salas:', error);
            res.status(500).json({ message: 'Error al obtener salas', error });
        }
    },

    // Obtener una sala por ID
    getOne: async (req, res) => {
        try {
            const sala = await Sala.findById(req.params.id);
            if (!sala) {
                return res.status(404).json({ message: 'Item no encontrada' });
            }
            res.json(sala);
        } catch (err) {
            console.error('Error al obtener el item:', err);
            res.status(500).json({ message: 'Error al obtener el item' });
        }
    },

    // Crear una nueva sala
    save: async (req, res) => {
        try {
            const { nombre, tipo, maxCamas } = req.body;
            const nuevaSala = new Sala({ nombre, tipo, maxCamas });
            await nuevaSala.save();
            res.status(201).json({ message: 'Item creado exitosamente', sala: nuevaSala });
        } catch (err) {
            console.error('Error al crear el item:', err);
            res.status(500).json({ message: 'Error al crear el item' });
        }
    },

    // Actualizar una sala por ID
    update: async (req, res) => {
        try {
            const { nombre, tipo, maxCamas } = req.body;
            const salaActualizada = await Sala.findByIdAndUpdate(
                req.params.id,
                { nombre, tipo, maxCamas },
                { new: true }
            );
            if (!salaActualizada) {
                return res.status(404).json({ message: 'Item no encontrada' });
            }
            res.json({ message: 'Item actualizada exitosamente', sala: salaActualizada });
        } catch (err) {
            console.error('Error al actualizar el item:', err);
            res.status(500).json({ message: 'Error al actualizar el item' });
        }
    },

    // Eliminar una sala por ID
    delete: async (req, res) => {
        try {
            const salaEliminada = await Sala.findByIdAndDelete(req.params.id);
            if (!salaEliminada) {
                return res.status(404).json({ message: 'Item no encontrada' });
            }
            res.json({ message: 'Item eliminada exitosamente' });
        } catch (err) {
            console.error('Error al eliminar el item:', err);
            res.status(500).json({ message: 'Error al eliminar el item' });
        }
    }
};

module.exports = salaController;