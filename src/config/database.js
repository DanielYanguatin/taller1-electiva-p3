// config/database.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log(`✅ MongoDB Conectado: ${conn.connection.host}`);
    console.log(`📦 Base de datos: ${conn.connection.name}`);
    
    // Eventos de conexión (opcional pero útil para debugging)
    mongoose.connection.on('error', err => {
      console.error('❌ Error de MongoDB:', err);
    });
    
    mongoose.connection.on('disconnected', () => {
      console.log('⚠️ MongoDB desconectado');
    });
    
  } catch (error) {
    console.error('❌ Error conectando a MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;