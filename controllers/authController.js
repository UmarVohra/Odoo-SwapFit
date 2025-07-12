const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
require('dotenv').config(); // to use .env variables

// In-memory OTP store
const otpStore = new Map();
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// ✅ Configure Nodemailer (write this once, near the top)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});


// Send OTP
exports.sendOtp = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ msg: 'Email is required' });


  const existingUser = await User.findOne({ email });
if (existingUser) return res.status(400).json({ msg: 'Email already registered' });


  const otp = generateOTP();
  otpStore.set(email, otp);

  // Email content
  const mailOptions = {
    from: `"OTP Verification" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP is: ${otp}`,
    html: `<h3>Your OTP is:</h3><p style="font-size:18px;">${otp}</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ msg: 'OTP sent to your email' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Failed to send OTP. Try again later.' });
  }
};


// Signup
exports.signup = async (req, res) => {
  const { username, email, password, confirmPassword, otp } = req.body;

  if (!email || !password || !confirmPassword || !otp)
    return res.status(400).json({ msg: 'All fields are required' });

  if (password !== confirmPassword)
    return res.status(400).json({ msg: 'Passwords do not match' });

  const validOtp = otpStore.get(email);
  if (!validOtp || validOtp !== otp)
    return res.status(400).json({ msg: 'Invalid or expired OTP' });

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, email, password: hashedPassword });
  await user.save();

  otpStore.delete(email);
  res.status(201).json({ msg: 'Signup successful' });
};

// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ msg: 'Email and password required' });

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ msg: 'email Invalid credentials' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

  const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET || 'secret123',
    { expiresIn: '1d' }
  );

  res.json({ msg: 'Login successful', token });
};

