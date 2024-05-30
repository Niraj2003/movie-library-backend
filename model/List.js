const mongoose = require('mongoose');

const ListSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  movies: [
    {
      type: Object,
      required: true,
    },
  ],
  isPublic: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

module.exports = mongoose.model('List', ListSchema);
