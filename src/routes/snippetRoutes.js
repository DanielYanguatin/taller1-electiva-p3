const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { validateSnippet } = require('../middleware/validators');
const {
  createSnippet,
  getSnippets,
  getSnippetById,
  updateSnippet,
  deleteSnippet
} = require('../controllers/snippetController');

// Todas las rutas de snippets son privadas
router.use(protect);

router.route('/')
  .post(validateSnippet, createSnippet)
  .get(getSnippets);

router.route('/:id')
  .get(getSnippetById)
  .put(validateSnippet, updateSnippet)
  .delete(deleteSnippet);

module.exports = router;