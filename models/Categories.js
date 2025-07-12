const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Category name is required'],
    trim: true,
    minlength: [2, 'Category name must be at least 2 characters'],
    maxlength: [50, 'Category name must not exceed 50 characters'],
  },
  image: {
    type: String,
    required: [true, 'Image URL or path is required'],
    match: [
      /\.(jpg|jpeg|png|webp)$/,
      'Only image files (jpg, jpeg, png, webp) are allowed',
    ],
  },
}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);
