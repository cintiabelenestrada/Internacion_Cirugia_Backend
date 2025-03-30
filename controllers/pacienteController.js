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
    getByDni: async (req, res) => {
        try {
            const dni = parseInt(req.params.dni);
            if (isNaN(dni)) {
                return res.status(400).json({ message: 'Invalid DNI format' });
            }

            const item = await Paciente.findOne({ dni: dni });
            if (!item) {
                return res.status(404).json({ message: 'Paciente not found' });
            }

            res.json(item);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    searchDni: async (req, res) => {
        try {
            const { dni } = req.query;
            const patients = await Paciente.find({ dni: new RegExp(`^${dni}`, 'i') }).limit(100);
            res.json(patients);
        } catch (error) {
            res.status(500).send(error);
        }
    }
    ,
    search: async (req, res) => {
        const searchTerm =
            req.query.q || 'No search term provided';
        res.send(`Search Term: ${searchTerm}`);
    }
}






module.exports = pacienteController;