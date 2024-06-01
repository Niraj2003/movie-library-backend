const express = require('express');
const {
  createList,
  getLists,
  getListById,
  updateList,
  deleteList,
  getPublicLists,
} = require('../listController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/create', authMiddleware, createList);

router.get('/my-lists', authMiddleware, getLists);

module.exports = router;
