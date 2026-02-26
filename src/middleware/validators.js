const { body, validationResult } = require('express-validator');

// Validadores para snippets
const validateSnippet = [
  body('title')
    .notEmpty().withMessage('El título es obligatorio')
    .isLength({ min: 3 }).withMessage('El título debe tener al menos 3 caracteres')
    .trim(),
  body('language')
    .notEmpty().withMessage('El lenguaje es obligatorio')
    .isIn(['javascript', 'python', 'css', 'html', 'java', 'c++', 'c#', 'php', 'ruby', 'go', 'rust', 'swift', 'kotlin', 'typescript'])
    .withMessage('Lenguaje no válido'),
  body('code')
    .notEmpty().withMessage('El código es obligatorio'),
  body('tags')
    .optional()
    .isArray().withMessage('Tags debe ser un array'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }
    next();
  }
];

// Validadores para registro
const validateRegister = [
  body('username')
    .notEmpty().withMessage('El username es obligatorio')
    .isLength({ min: 3 }).withMessage('El username debe tener al menos 3 caracteres')
    .trim(),
  body('email')
    .notEmpty().withMessage('El email es obligatorio')
    .isEmail().withMessage('Email inválido')
    .normalizeEmail(),
  body('password')
    .notEmpty().withMessage('La contraseña es obligatoria')
    .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }
    next();
  }
];

// Validadores para login
const validateLogin = [
  body('email')
    .notEmpty().withMessage('El email es obligatorio')
    .isEmail().withMessage('Email inválido')
    .normalizeEmail(),
  body('password')
    .notEmpty().withMessage('La contraseña es obligatoria'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }
    next();
  }
];

module.exports = {
  validateSnippet,
  validateRegister,
  validateLogin
};