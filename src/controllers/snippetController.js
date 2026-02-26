const Snippet = require('../models/Snippet');
const asyncHandler = require('../utils/asyncHandler');

// @desc    Crear snippet
// @route   POST /api/v1/snippets
// @access  Private
const createSnippet = asyncHandler(async (req, res) => {
  const { title, language, code, tags } = req.body;

  // Crear snippet asignando automáticamente el usuario del token
  const snippet = await Snippet.create({
    user: req.user._id, // El ID viene del token, NO del body
    title,
    language,
    code,
    tags: tags || []
  });

  res.status(201).json({
    success: true,
    data: snippet
  });
});

// @desc    Listar snippets del usuario actual
// @route   GET /api/v1/snippets
// @access  Private
const getSnippets = asyncHandler(async (req, res) => {
  // Solo devuelve snippets del usuario autenticado
  const snippets = await Snippet.find({ user: req.user._id })
    .sort('-createdAt');

  res.json({
    success: true,
    count: snippets.length,
    data: snippets
  });
});

// @desc    Obtener snippet por ID
// @route   GET /api/v1/snippets/:id
// @access  Private
const getSnippetById = asyncHandler(async (req, res) => {
  const snippet = await Snippet.findById(req.params.id);

  // Verificar si existe
  if (!snippet) {
    return res.status(404).json({
      success: false,
      error: 'Snippet no encontrado'
    });
  }

  // Verificar que pertenezca al usuario
  if (snippet.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({
      success: false,
      error: 'No autorizado para ver este snippet'
    });
  }

  res.json({
    success: true,
    data: snippet
  });
});

// @desc    Editar snippet
// @route   PUT /api/v1/snippets/:id
// @access  Private
const updateSnippet = asyncHandler(async (req, res) => {
  let snippet = await Snippet.findById(req.params.id);

  // Verificar si existe
  if (!snippet) {
    return res.status(404).json({
      success: false,
      error: 'Snippet no encontrado'
    });
  }

  // Verificar que pertenezca al usuario
  if (snippet.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({
      success: false,
      error: 'No autorizado para editar este snippet'
    });
  }

  // Actualizar snippet
  snippet = await Snippet.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true
    }
  );

  res.json({
    success: true,
    data: snippet
  });
});

// @desc    Borrar snippet
// @route   DELETE /api/v1/snippets/:id
// @access  Private
const deleteSnippet = asyncHandler(async (req, res) => {
  const snippet = await Snippet.findById(req.params.id);

  // Verificar si existe
  if (!snippet) {
    return res.status(404).json({
      success: false,
      error: 'Snippet no encontrado'
    });
  }

  // Verificar que pertenezca al usuario
  if (snippet.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({
      success: false,
      error: 'No autorizado para borrar este snippet'
    });
  }

  await snippet.deleteOne();

  res.json({
    success: true,
    data: {}
  });
});

module.exports = {
  createSnippet,
  getSnippets,
  getSnippetById,
  updateSnippet,
  deleteSnippet
};