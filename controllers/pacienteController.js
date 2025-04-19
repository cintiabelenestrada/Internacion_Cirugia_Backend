const Paciente = require('../models/Paciente');
const Cama = require('../models/Cama');
const Sala = require('../models/Sala');
const Medico = require('../models/Medico');

const pacienteController = {

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
    },

    // Buscar paciente por número de cama y sala
    getPacientePorCamaYSala: async (req, res) => {
        try {
            const { numeroCama, sala } = req.params; // Número de cama y sala desde los parámetros de la URL

            // Buscar el paciente por cama y sala
            const paciente = await Paciente.findOne({ sala })
                .populate({
                    path: 'cama',
                    match: { numero: numeroCama } // Filtrar por número de cama
                })
                .populate('medico', 'nombre apellido');

            if (!paciente || !paciente.cama) {
                return res.status(404).json({ message: 'No se encontró un paciente en esta cama y sala' });
            }

            res.status(200).json(paciente);
        } catch (error) {
            console.error('Error al obtener paciente por cama y sala:', error);
            res.status(500).json({ message: 'Error al obtener paciente por cama y sala', error });
        }
    },

    // Buscar un paciente por nombre o número de cama
    buscarPaciente: async (req, res) => {
        try {
            const { nombre, cama } = req.query;

            // Construir el filtro dinámicamente
            const filtro = {};
            if (nombre) filtro.nombre = new RegExp(nombre, 'i'); // Búsqueda insensible a mayúsculas/minúsculas
            if (cama) filtro.cama = cama;

            // Buscar pacientes que coincidan con el filtro
            const pacientes = await Paciente.find(filtro).populate('medico', 'nombre apellido');
            if (pacientes.length === 0) {
                return res.status(404).json({ message: 'No se encontraron pacientes' });
            }

            res.status(200).json(pacientes);
        } catch (error) {
            console.error('Error al buscar pacientes:', error);
            res.status(500).json({ message: 'Error al buscar pacientes' });
        }
    },

    createPaciente: async (req, res) => {
        try {
            const { nombreSala, numeroCama, nombreMedico, apellidoMedico, ...pacienteData } = req.body;

            // Buscar la sala por nombre
            const sala = await Sala.findOne({ nombre: nombreSala });
            if (!sala) {
                return res.status(404).json({ message: 'Sala no encontrada' });
            }

            // Buscar la cama por número y sala
            const cama = await Cama.findOne({ numero: numeroCama, sala: sala._id, estado: 'disponible' });
            if (!cama) {
                return res.status(400).json({ message: 'La cama no está disponible o no pertenece a esta sala' });
            }

            // Buscar el médico por nombre y apellido
            const medico = await Medico.findOne({ nombre: nombreMedico, apellido: apellidoMedico });
            if (!medico) {
                return res.status(404).json({ message: 'Médico no encontrado' });
            }

            // Crear el paciente
            const nuevoPaciente = new Paciente({
                ...pacienteData,
                sala: sala._id,
                cama: cama._id,
                medico: medico._id
            });

            await nuevoPaciente.save();

            // Actualizar el estado de la cama a "ocupada"
            cama.estado = 'ocupada';
            await cama.save();

            res.status(201).json({ message: 'Paciente creado exitosamente', paciente: nuevoPaciente });
        } catch (error) {
            console.error('Error al crear el paciente:', error);
            res.status(500).json({ message: 'Error al crear el paciente', error });
        }
    },

    // Obtener pacientes por sala
    getPacientesPorSala: async (req, res) => {
        try {
            const { sala } = req.query; // ID de la sala desde los parámetros de consulta
            const pacientes = await Paciente.find({ sala }).populate('cama', 'numero').populate('medico', 'nombre apellido');
            
            if (pacientes.length === 0) {
                return res.status(404).json({ message: 'No se encontraron pacientes en esta sala' });
            }

            res.status(200).json(pacientes);
        } catch (error) {
            console.error('Error al obtener pacientes por sala:', error);
            res.status(500).json({ message: 'Error al obtener pacientes por sala', error });
        }
    },

    // Buscar pacientes por nombre
    buscarPacientePorNombre: async (req, res) => {
        try {
            const { nombre } = req.query; // Nombre desde los parámetros de consulta

            // Buscar pacientes cuyo nombre coincida parcialmente (insensible a mayúsculas/minúsculas)
            const pacientes = await Paciente.find({ nombre: new RegExp(nombre, 'i') })
                .populate('cama', 'numero')
                .populate('sala', 'nombre')
                .populate('medico', 'nombre apellido');

            if (pacientes.length === 0) {
                return res.status(404).json({ message: 'No se encontraron pacientes con ese nombre' });
            }

            res.status(200).json(pacientes);
        } catch (error) {
            console.error('Error al buscar pacientes por nombre:', error);
            res.status(500).json({ message: 'Error al buscar pacientes por nombre', error });
        }
    }
};

module.exports = pacienteController;