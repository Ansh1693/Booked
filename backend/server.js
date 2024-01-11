const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const Razorpay = require('razorpay');
const shortid = require('shortid');
const cors = require('cors');
dotenv.config();

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origins, X-Requested-With, Content-Type, Accept');
    res.header("Access-Control-Allow-Method", "*");
    next();
})


app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json())

// Configuring the database
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

dotenv.config({ path : "./config/config.env"});
//mongodb connection
const url = process.env.MONGO_URI;

// Connecting to the database
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});


// define a simple route
app.get('/', (req, res) => {
    res.json({ "message": "Welcome to you." });
});

//razorpay route
const razorpay = new Razorpay({
    key_id:  'rzp_test_vlPwuXtjFz1cq1',
    // key_id: 'rzp_test_ob62AGJ7S9RoWN',
    key_secret:  'vNIknG6tfpXZ3hobzLWjK3VD',
    // key_secret: 'W946kbDsPinmRiVatyOja3Ob',
  });

  // console.log(razorpay);
  
app.post("/razorpay" , async (req, res) => {
    const {amount, currency} = req.body;
  
   const options = {
      // "amount": amount * 100,
      "amount": +amount * 100,
      "currency": "INR",
      "receipt": shortid.generate(),
    };
  
    // console.log(options);
    try {
      const response = await razorpay.orders.create(options);
      console.log(response);
      res.json(response);
    } catch (error) {
      console.log(error);
      return ;
    }
  });

  app.post("/verify" , async (req, res, next) => {
    // console.log(req.body);
  
    const sign = req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;
  
    const expectedSign = crypto
      .createHmac("sha256", process.env.Razorpay_Secret)
      .update(sign.toString())
      .digest("hex");
  
    if (razorpay_signature === expectedSign) {
      return res.status(200).json({ message: req.body });
    } else {
      return res.status(400).json({ message: "Invalid signature sent!" });
    }
  });

require('./app/routes/admin.routes.js')(app);
require('./app/routes/anonymous.routes.js')(app);
require('./app/routes/customer.routes.js')(app);
require('./app/routes/partner.routes.js')(app);
require('./app/routes/reception.routes.js')(app);
require('./app/routes/team.routes.js')(app);

// listen for requests
app.listen(process.env.node_port, () => {
    console.log("Server is listening on port ", process.env.node_port);
});
