const User = require('../models/User');
const jwt = require('jsonwebtoken');
const asyncHandler = require('../utils/asyncHandler');

// Generar token JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

// @desc    Registrar usuario
// @route   POST /api/v1/auth/register
// @access  Public
const register = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  // Verificar si el usuario ya existe
  const userExists = await User.findOne({ $or: [{ email }, { username }] });
  
  if (userExists) {
    return res.status(400).json({
      success: false,
      error: 'Usuario o email ya registrado'
    });
  }

  // Crear usuario
  const user = await User.create({
    username,
    email,
    password
  });

  // Generar token
  const token = generateToken(user._id);

  res.status(201).json({
    success: true,
    token,
    user: {
      id: user._id,
      username: user.username,
      email: user.email
    }
  });
});

// @desc    Login usuario
// @route   POST /api/v1/auth/login
// @access  Public
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Buscar usuario incluyendo password
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return res.status(401).json({
      success: false,
      error: 'Credenciales inválidas'
    });
  }

  // Verificar contraseña
  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    return res.status(401).json({
      success: false,
      error: 'Credenciales inválidas'
    });
  }

  // Generar token
  const token = generateToken(user._id);

  res.json({
    success: true,
    token,
    user: {
      id: user._id,
      username: user.username,
      email: user.email
    }
  });
});

// @desc    Obtener perfil del usuario actual
// @route   GET /api/v1/auth/profile
// @access  Private
const getProfile = asyncHandler(async (req, res) => {
  res.json({
    success: true,
    user: {
      id: req.user._id,
      username: req.user.username,
      email: req.user.email
    }
  });
});

module.exports = {
  register,
  login,
  getProfile
};