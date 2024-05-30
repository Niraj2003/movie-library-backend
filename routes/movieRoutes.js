const express = require('express');
const { searchMovies } = require('../movieController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Search for movies (requires authentication)
router.get('/search', authMiddleware, searchMovies);

module.exports = router;
