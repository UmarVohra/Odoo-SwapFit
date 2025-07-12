// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    minlength: [3, 'Username must be at least 3 characters'],
    maxlength: [30, 'Username must not exceed 30 characters'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/,
      'Please enter a valid email',
    ],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
  },
  phone: {
    type: String,
    trim: true,
    match: [
      /^[0-9]{10}$/,
      'Phone number must be 10 digits',
    ],
  },
  address: {
    type: String,
    trim: true,
    maxlength: [100, 'Address must not exceed 100 characters'],
  },
  image: {
    type: String,
    trim: true,
    match: [
      /\.(jpg|jpeg|png|webp)$/,
      'Only image files (jpg, jpeg, png, webp) are allowed',
    ],
  },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
