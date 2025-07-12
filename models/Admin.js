const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Admin name is required'],
    trim: true,
    minlength: [3, 'Name must be at least 3 characters'],
    maxlength: [50, 'Name must not exceed 50 characters'],
  },
  image: {
    type: String,
    match: [
      /\.(jpg|jpeg|png|webp)$/,
      'Only image files (jpg, jpeg, png, webp) are allowed',
    ],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/,
      'Invalid email format',
    ],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
  },
}, { timestamps: true });

module.exports = mongoose.model('Admin', adminSchema);
