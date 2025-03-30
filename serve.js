require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const roleRoutes = require('./routes/roleRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const pacinteRoutes = require('./routes/pacienteRoutes');
const medicoRoutes = require('./routes/medicoRoutes');
const camaRoutes = require('./routes/camaRoutes');


// Conexión a la base de datos
connectDB();

const app = express();
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
app.use('/auth', authRoutes);
app.use('/api',roleRoutes);
app.use('/api',serviceRoutes);
app.use('/api',pacinteRoutes);
app.use('/api', medicoRoutes);
app.use('/api',camaRoutes);


// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));