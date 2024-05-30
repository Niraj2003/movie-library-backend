const express = require('express');
const {
  createList,
  getLists,
  getListById,
  updateList,
  deleteList,
} = require('../listController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Create a new list (requires authentication)
router.post('/', authMiddleware, createList);

// Get all lists for the authenticated user
router.get('/', authMiddleware, getLists);

// Get a specific list by ID (requires authentication)
router.get('/:id', authMiddleware, getListById);

// Update a list (requires authentication)
router.put('/:id', authMiddleware, updateList);

// Delete a list (requires authentication)
router.delete('/:id', authMiddleware, deleteList);

module.exports = router;
