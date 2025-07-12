const express = require('express');
const nodemailer = require('nodemailer');
require('dotenv').config();
const path = require('path');
const authRoutes = require('./routes/authRoutes');

const connectDB = require('./config/db');
connectDB();


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('views')); 
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/', authRoutes);


app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'signup.html'));
});
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'login.html'));
});



app.listen(3000, () => console.log('Server running on http://localhost:3000'));
