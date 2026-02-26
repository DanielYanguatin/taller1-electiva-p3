const express = require('express');
const router = express.Router();
const { register, login, getProfile } = require('../controllers/authController');
const { validateRegister, validateLogin } = require('../middleware/validators');
const { protect } = require('../middleware/auth');

// Rutas públicas
router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);

// Rutas privadas
router.get('/profile', protect, getProfile);

module.exports = router;