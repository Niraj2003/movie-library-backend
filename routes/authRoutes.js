const express = require('express');
const { register, login, getUserProfile } = require('../authController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.use(express.json());

// Register new user
router.post('/register', register);

// Login existing user
router.post('/login', login);

router.get('/profile', authMiddleware, getUserProfile);

module.exports = router;
