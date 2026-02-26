require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');

// Conectar a MongoDB
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // Para parsear JSON

// Rutas (las crearemos después)
app.use('/api/v1/auth', require('./routes/authRoutes'));
app.use('/api/v1/snippets', require('./routes/snippetRoutes'));

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ 
    message: 'DevLocker API', 
    status: 'online',
    database: 'MongoDB Atlas'
  });
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    error: err.message 
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});