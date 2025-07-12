const mongoose = require('mongoose');

const connectDB = async ()=>{
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/otpAuth');
        console.log("Database Connected!!");
    }catch(err){
        console.log("Failed to connect to database: ");
        console.error(err);
        exit(1);
    }
};

module.exports = connectDB;