const sendOtp = require('./app/utils/sendOtp.util');
require('dotenv').config({ path: './config/config.env'});

console.log(process.env.MAILJET_API_KEY, process.env.MAILJET_API_SECRET);

sendOtp("anshgoel44@gmail.com" , "1234");