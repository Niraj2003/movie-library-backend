const express = require('express');
const { register, login } = require('../authController');
const router = express.Router();

router.use(express.json());

// Register new user
router.post('/register', register);

// Login existing user
router.post('/login', login);

module.exports = router;
