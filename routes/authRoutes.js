const express = require('express');
const { register, login, getUserProfile } = require('../authController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.use(express.json());

router.post('/register', register);

router.post('/login', login);

router.get('/profile', authMiddleware, getUserProfile);

module.exports = router;
