const Paciente = require('../models/Paciente');
var pacienteController = {

    getAll: async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const skip = (page - 1) * limit;

            const items = await Paciente.find().skip(skip).limit(limit).sort({_id:-1});
            const totalItems = await Paciente.countDocuments();
            const totalPages = Math.ceil(totalItems / limit);
            res.json({
                items,
                totalItems,
                totalPages,
                currentPage: page
            });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    
    getOne: async (req, res) => {
        try {
            const item = await Paciente.findById(req.params.id);
            if (item == null) {
                return res.status(404).json({ message: 'Item no encontrado' });
            }
            res.json(item);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    getPacientePorDNI: async (req, res) => {
        try {
            const paciente = await Paciente.findOne({ dni: req.params.dni })
                .populate('cama') // Populate cama details
                .populate('medico'); // Populate doctor details
            if (!paciente) {
                return res.status(404).json({ message: 'Paciente not found' });
            }
            res.status(200).json(paciente);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching paciente', error });
        }
    },

    save: async (req, res) => {
        try {
            const item = new Paciente(req.body);
            console.log(item);
            const savedItem = await item.save();
            res.status(201).json(savedItem);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },

    update: async (req, res) => {
        try {
            const updatedItem = await Paciente.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (updatedItem == null) {
                return res.status(404).json({ message: 'Item no encontrado' });
            }
            res.json(updatedItem);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },

    delete: async (req, res) => {
        try {
            const deletedItem = await Paciente.findByIdAndDelete(req.params.id);
            if (deletedItem == null) {
                return res.status(404).json({ message: 'Item no encontrado' });
            }
            res.json({ message: 'Item eliminado' });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    // Update patient's diagnosis and observations
    actualizarDiagnosticoYObservaciones: async (req, res) => {
        try {
            const { diagnosticos, observaciones } = req.body;
            const paciente = await Paciente.findByIdAndUpdate(
                req.params.id,
                { $set: { diagnosticos, observaciones } },
                { new: true }
            );
            if (!paciente) {
                return res.status(404).json({ message: 'Paciente not found' });
            }
            res.status(200).json(paciente);
        } catch (error) {
            res.status(500).json({ message: 'Error updating paciente', error });
        }
    }
}


module.exports = pacienteController;