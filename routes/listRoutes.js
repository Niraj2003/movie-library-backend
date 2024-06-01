const express = require('express');
const { createList, getLists, getPublicLists } = require('../listController');

const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/create', authMiddleware, createList);

router.get('/my-lists', authMiddleware, getLists);

router.get('/public-lists', getPublicLists);

module.exports = router;
