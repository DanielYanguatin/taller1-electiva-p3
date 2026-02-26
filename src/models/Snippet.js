const mongoose = require('mongoose');

const snippetSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId, // Tipo especial para IDs
    ref: 'User', // Referencia al modelo User (como llave foránea)
    required: true
  },
  title: {
    type: String,
    required: [true, 'El título es obligatorio'],
    minlength: [3, 'El título debe tener al menos 3 caracteres'],
    trim: true
  },
  language: {
    type: String,
    required: [true, 'El lenguaje es obligatorio'],
    enum: ['javascript', 'python', 'css', 'html', 'java'], // Valores permitidos
    default: 'javascript'
  },
  code: {
    type: String,
    required: [true, 'El código es obligatorio']
  },
  tags: [{
    type: String,
    trim: true
  }]
}, {
  timestamps: true
});

// Índice para búsquedas más rápidas
snippetSchema.index({ user: 1, createdAt: -1 });

module.exports = mongoose.model('Snippet', snippetSchema);



// const mongoose = require('mongoose');

// const snippetSchema = new mongoose.Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User', // Referencia al modelo User
//     required: true
//   },
//   title: {
//     type: String,
//     required: [true, 'El título es obligatorio'],
//     minlength: [3, 'El título debe tener al menos 3 caracteres'],
//     trim: true
//   },
//   language: {
//     type: String,
//     required: [true, 'El lenguaje es obligatorio'],
//     enum: ['javascript', 'python', 'css', 'html', 'java', 'c++', 'c#', 'php', 'ruby', 'go', 'rust', 'swift', 'kotlin', 'typescript'],
//     default: 'javascript'
//   },
//   code: {
//     type: String,
//     required: [true, 'El código es obligatorio']
//   },
//   tags: [{
//     type: String,
//     trim: true
//   }]
// }, {
//   timestamps: true
// });

// // Índice para búsquedas eficientes por usuario
// snippetSchema.index({ user: 1, createdAt: -1 });

// module.exports = mongoose.model('Snippet', snippetSchema);