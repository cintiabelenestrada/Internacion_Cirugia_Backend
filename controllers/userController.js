const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userController = {
    // Registrar un usuario
    registerUser: async (req, res) => {
        const { username, password, email, name, isActive, role } = req.body;
        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const newUser = new User({ username, password: hashedPassword, email, name, isActive, role });

            await newUser.save();

            res.status(201).json({ message: 'Usuario registrado exitosamente' });
        } catch (error) {
            res.status(500).json({ error: 'Error al registrar usuario' });
        }
    },

    // Iniciar sesión
    loginUser: async (req, res) => {
        const { usernameOrEmail, password } = req.body; // Recibir username o email
        try {
            // Buscar al usuario por nombre de usuario o correo electrónico
            const user = await User.findOne({
                $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }]
            }).populate('role'); 

            if (!user) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }

            // Verificar la contraseña
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ error: 'Contraseña incorrecta' });
            }

            // Generar el token JWT
            const token = jwt.sign(
                {
                    id: user._id,
                    name: user.name,
                    role: user.role?.name || null, 
                },
                process.env.JWT_SECRET,
                { expiresIn: '10h' } // El token expira en 10 horas
            );

            // Enviar el token al cliente
            res.json({ token });
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            res.status(500).json({ error: 'Error al iniciar sesión' });
        }
    },

    // Obtener todos los usuarios
    getAll: async (req, res) => {
        try {
            const items = await User.find().populate('role'); 
            res.json(items);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    // Obtener un usuario por ID
    getOne: async (req, res) => {
        try {
            const item = await User.findById(req.params.id).populate('role'); 
            if (item == null) {
                return res.status(404).json({ message: 'Item no encontrado' });
            }
            res.json(item);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    // Eliminar un usuario por ID
    delete: async (req, res) => {
        try {
            const deletedItem = await User.findByIdAndDelete(req.params.id);
            if (deletedItem == null) {
                return res.status(404).json({ message: 'Item no encontrado' });
            }
            res.json({ message: 'Item eliminado' });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
};

module.exports = userController;