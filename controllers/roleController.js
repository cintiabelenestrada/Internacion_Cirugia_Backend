const Role = require('../models/Role');

const roleController = {
    // Obtener todos los roles
    getAll: async (req, res) => {
        try {
            const items = await Role.find();
            res.json(items);
        } catch (err) {
            console.error('Error al obtener los items:', err);
            res.status(500).json({ message: 'Error al obtener los items' });
        }
    },

    // Obtener un rol por ID
    getOne: async (req, res) => {
        try {
            const item = await Role.findById(req.params.id);
            if (!item) {
                return res.status(404).json({ message: 'Item no encontrado' });
            }
            res.json(item);
        } catch (err) {
            console.error('Error al obtener el item:', err);
            res.status(500).json({ message: 'Error al obtener el item' });
        }
    },

    // Crear un nuevo rol
    save: async (req, res) => {
        try {
            const item = new Role(req.body);
            const savedItem = await item.save();
            res.status(201).json(savedItem);
        } catch (err) {
            console.error('Error al crear el item:', err);
            res.status(400).json({ message: 'Error al crear el item' });
        }
    },

    // Actualizar un rol por ID
    update: async (req, res) => {
        try {
            const updatedItem = await Role.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!updatedItem) {
                return res.status(404).json({ message: 'Item no encontrado' });
            }
            res.json(updatedItem);
        } catch (err) {
            console.error('Error al actualizar el item:', err);
            res.status(400).json({ message: 'Error al actualizar el item' });
        }
    },

    // Eliminar un rol por ID
    delete: async (req, res) => {
        try {
            const deletedItem = await Role.findByIdAndDelete(req.params.id);
            if (!deletedItem) {
                return res.status(404).json({ message: 'Item no encontrado' });
            }
            res.json({ message: 'Item eliminado' });
        } catch (err) {
            console.error('Error al eliminar el item:', err);
            res.status(500).json({ message: 'Error al eliminar el item' });
        }
    },

    // Inicializar roles predefinidos
    initializeRoles: async () => {
        try {
            const predefinedRoles = ['admin', 'medico', 'asistente'];
            for (const roleName of predefinedRoles) {
                const existingRole = await Role.findOne({ name: roleName });
                if (!existingRole) {
                    await new Role({ name: roleName }).save();
                }
            }
            console.log('Roles inicializados correctamente');
        } catch (err) {
            console.error('Error al inicializar los roles:', err);
        }
    }
};

// Inicializar roles al cargar el controlador
roleController.initializeRoles();

module.exports = roleController;