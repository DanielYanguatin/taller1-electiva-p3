// Middleware global de manejo de errores
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  console.error(err);

  // Error de validación de Mongoose
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message);
    error = {
      success: false,
      error: message
    };
    return res.status(400).json(error);
  }

  // Error de ID inválido de Mongoose
  if (err.name === 'CastError') {
    const message = 'Recurso no encontrado';
    error = {
      success: false,
      error: message
    };
    return res.status(404).json(error);
  }

  // Error de duplicado (unique)
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    const message = `El ${field} ya está registrado`;
    error = {
      success: false,
      error: message
    };
    return res.status(400).json(error);
  }

  // Error por defecto
  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Error del servidor'
  });
};

module.exports = errorHandler;