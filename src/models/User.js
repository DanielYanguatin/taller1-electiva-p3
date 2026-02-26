const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// 1. Definir el esquema (estructura de los documentos)
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'El nombre de usuario es obligatorio'],
    unique: true, // No puede haber dos usuarios con el mismo username
    trim: true,   // Elimina espacios al inicio y final
    minlength: [3, 'El username debe tener al menos 3 caracteres']
  },
  email: {
    type: String,
    required: [true, 'El email es obligatorio'],
    unique: true,
    lowercase: true, // Convierte a minúsculas automáticamente
    match: [/^\S+@\S+\.\S+$/, 'Email inválido'] // Validación con regex
  },
  password: {
    type: String,
    required: [true, 'La contraseña es obligatoria'],
    minlength: [6, 'La contraseña debe tener al menos 6 caracteres'],
    select: false // Por defecto no se devuelve en las consultas
  }
}, {
  timestamps: true // Agrega createdAt y updatedAt automáticamente
});

// 2. Middleware: se ejecuta antes de guardar (pre-save)
userSchema.pre('save', async function(next) {
  // 'this' es el documento que se va a guardar
  if (!this.isModified('password')) return next();
  
  // Encriptar contraseña
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// 3. Método personalizado para comparar contraseñas
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// 4. Crear el modelo a partir del esquema
module.exports = mongoose.model('User', userSchema);



// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

// const userSchema = new mongoose.Schema({
//   username: {
//     type: String,
//     required: [true, 'El nombre de usuario es obligatorio'],
//     unique: true,
//     trim: true,
//     minlength: [3, 'El nombre de usuario debe tener al menos 3 caracteres']
//   },
//   email: {
//     type: String,
//     required: [true, 'El email es obligatorio'],
//     unique: true,
//     lowercase: true,
//     match: [/^\S+@\S+\.\S+$/, 'Email inválido']
//   },
//   password: {
//     type: String,
//     required: [true, 'La contraseña es obligatoria'],
//     minlength: [6, 'La contraseña debe tener al menos 6 caracteres'],
//     select: false
//   }
// }, {
//   timestamps: true
// });

// // Hash contraseña antes de guardar
// userSchema.pre('save', async function(next) {
//   if (!this.isModified('password')) return next();
  
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

// // Método para comparar contraseñas
// userSchema.methods.comparePassword = async function(candidatePassword) {
//   return await bcrypt.compare(candidatePassword, this.password);
// };

// module.exports = mongoose.model('User', userSchema);