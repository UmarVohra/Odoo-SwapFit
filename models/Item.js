const mongoose = require('mongoose');
const User = require('../models/User');
const Category = require('../models/Categories');

const itemSchema = new mongoose.Schema({
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  item_name: {
    type: String,
    required: true
  },
  image: {
    type: String, // Store image URL or path
    required: true
  },
  item_description: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 0
  },
  points: {
    type: Number, // Used for exchange system
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Item', itemSchema);