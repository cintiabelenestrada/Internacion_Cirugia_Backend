require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const roleRoutes = require('./routes/roleRoutes');
const pacienteRoutes = require('./routes/pacienteRoutes');
const medicoRoutes = require('./routes/medicoRoutes');
const camaRoutes = require('./routes/camaRoutes');
const rateLimit = require('express-rate-limit');
const unless = require('express-unless');
const userRoutes = require('./routes/userRoutes');
const salaRoutes = require('./routes/salaRoutes');

// Conexión a la base de datos
connectDB();

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 15, // Máximo 15 intentos de inicio de sesión por IP
    message: 'Demasiados intentos de inicio de sesión, por favor intente nuevamente después de 15 minutos.',
});

const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 1000, // Máximo 1000 solicitudes por IP
    message: 'Demasiadas solicitudes desde esta IP, por favor intente nuevamente después de 15 minutos.',
});

// Middleware personalizado para excluir rutas específicas
const applyGeneralLimiter = (req, res, next) => {
    if (req.path === '/api/auth/login') {
        return next(); // Excluir esta ruta del limitador
    }
    generalLimiter(req, res, next); // Aplicar el limitador a otras rutas
};

const app = express();

// Aplicar el rate limiter solo a la ruta de login
app.use('/api/auth/login', loginLimiter);

// Aplicar el middleware personalizado
app.use(applyGeneralLimiter);

// Set up CORS
app.use(cors({
    origin: true, // "true" will copy the domain of the request back
                  // to the reply. If you need more control than this
                  // use a function.

    credentials: true, // This MUST be "true" if your endpoint is
                       // authenticated via either a session cookie
                       // or Authorization header. Otherwise the
                       // browser will block the response.

    methods: 'POST,GET,PUT,OPTIONS,DELETE' // Make sure you're not blocking
                                           // pre-flight OPTIONS requests
}));
app.use(bodyParser.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api', roleRoutes);
app.use('/api', pacienteRoutes);
app.use('/api', medicoRoutes);
app.use('/api', camaRoutes);
app.use('/api', userRoutes);
app.use('/api', salaRoutes); // Agregar las rutas de salas

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));