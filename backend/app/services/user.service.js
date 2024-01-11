const User = require("../models/user.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var url = require("url");
const Hotel = require("../models/hotel.model.js");
const sendOtpMail = require("../utils/sendOtp.util.js");
const RoomBook = require("../models/roomBook.model.js");

// const sgMail = require("@sendgrid/mail");

// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.registerUser = async (req, res) => {
  try {
    // Get user input
    const { firstName, lastName, email, mobile } = req.body;

    // Validate user input
    if (!(email && firstName && lastName)) {
      return Promise.reject("All input is required");
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ email });
    console.log(oldUser);

    if (oldUser) {
      return Promise.reject("User Already Exist. Please Login");
    }

    var queryString = url.parse(req.url, true);
    var role;
    if (queryString && queryString.href == "/api/v1/customer/register") {
      role = "CUSTOMER";
    } else if (queryString && queryString.href == "/api/v1/partner/register") {
      role = "PARTNER";
    } else if (queryString && queryString.href == "/api/v1/admin/register") {
      role = "ADMIN";
    }
    //Encrypt user password

    // Create user in our database
    const user = await User.create({
      firstName,
      lastName,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      role: role,
      mobile: mobile,
    });

    // Create token
    // const token = jwt.sign(
    //     { id: user._id, email, role },
    //     process.env.token_key,
    //     {
    //         expiresIn: "2h",
    //     }
    // );
    // save user token
    // user.token = token;
    await user.save();

    console.log(user);

    const token = await this.sendOtp(user.email);

    console.log(token);

    return Promise.resolve(token);
  } catch (error) {
    return Promise.reject(error);
  }
};

exports.loginWithPass = async (req, res) => {
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      return Promise.reject("All input is required");
    }

    // Validate if user exist in our database
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { id: user._id, email, role: user.role },
        process.env.token_key
      );

      // save user token

      return Promise.resolve(token);
    }
    return Promise.reject("Invalid Credentials");
  } catch (error) {
    return Promise.reject(error);
  }
};

exports.loginUser = async (req, res) => {
  try {
    // Get user input
    const { email } = req.body;

    // Validate user input
    if (!email) {
      return Promise.reject("All input is required");
    }
    // Validate if user exist in our database
    const user = await User.findOne({ email });

    var queryString = url.parse(req.url, true);
    var role;
    if (queryString && queryString.href == "/api/v1/customer/login") {
      role = "CUSTOMER";
    } else if (queryString && queryString.href == "/api/v1/partner/login") {
      role = "PARTNER";
    } else if (queryString && queryString.href == "/api/v1/admin/login") {
      role = "ADMIN";
    } else if (
      queryString &&
      queryString.href == "/api/v1/partner/reception/login"
    ) {
      role = "RECEPTION";
    } else if (queryString && queryString.href == "/api/v1/team/login") {
      role = "TEAM";
    }

    if (user) {
      // Create token

      if (user.role != role && user.role !== "TEAM" && role !== "ADMIN") {
        return Promise.reject("Access Denied");
      }

      const token = await this.sendOtp(user.email);

      // save user token
      return Promise.resolve(token);
    } else {
      const token = await this.sendOtp(email);
      return Promise.resolve(token);
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

exports.addUser = async (req, res) => {
  try {
    // Get user input
    const { firstName, lastName, email, password } = req.body;

    // Validate user input
    if (!(email && password && firstName && lastName)) {
      return Promise.reject("All input is required");
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return Promise.reject("User Already Exist. Please Login");
    }

    isPartnerAdmin = await User.findById({ _id: req.user.id });
    if (!isPartnerAdmin) {
      return Promise.reject("Partner Not Found");
    }
    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);
    let role = "RECEPTION";
    // Create user in our database
    const user = await User.create({
      firstName,
      lastName,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword,
      role: role,
      partnerId: isPartnerAdmin._id,
    });

    // Create token
    const token = jwt.sign(
      { id: user._id, email, role },
      process.env.token_key,
      {
        expiresIn: "2h",
      }
    );
    // save user token
    user.token = token;
    isPartnerAdmin.users.push(user._id);
    await user.save();
    await isPartnerAdmin.save();

    return Promise.resolve("User Created Successfully");
  } catch (error) {
    return Promise.reject(error);
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    const emailRecieved = req.body.email;
    const receivedOTP = req.body.otp;
    const token = req.body.token;
    const decodedToken = jwt.verify(token, process.env.EMAIL_OTP_SECRET_KEY);

    const { otp, email, expiryTime } = decodedToken;

    console.log(
      receivedOTP === otp,
      emailRecieved,
      typeof receivedOTP,
      typeof otp
    );
    console.log(otp, email, expiryTime);

    if (receivedOTP === otp) {
      const currentTime = Math.floor(Date.now() / 1000);
      console.log(currentTime <= expiryTime);
      // Current time in seconds
      if (currentTime <= expiryTime && email === emailRecieved) {
        const fetchedUser = await User.findOne({ email: emailRecieved });
        console.log(fetchedUser);
        if (!fetchedUser) {
          var queryString = url.parse(req.url, true);
          var role;
          if (queryString && queryString.href == "/api/v1/customer/verifyOtp") {
            role = "CUSTOMER";
          } else if (
            queryString &&
            queryString.href == "/api/v1/partner/verifyOtp"
          ) {
            role = "PARTNER";
          } else if (
            queryString &&
            queryString.href == "/api/v1/admin/verifyOtp"
          ) {
            role = "ADMIN";
          } else if (
            queryString &&
            queryString.href == "/api/v1/partner/reception/verifyOtp"
          ) {
            role = "RECEPTION";
          }
          const newUserCreate = await User.create({
            email: emailRecieved.toLowerCase(), // sanitize: convert email to lowercase
            role: role,
          });

          const jwtToken = jwt.sign(
            {
              id: newUserCreate._id,
              email: newUserCreate.email,
              role: newUserCreate.role,
            },
            process.env.token_key
          );
          return Promise.resolve({ jwt: jwtToken, newUser: true });
        } else {
          const jwtToken = jwt.sign(
            {
              id: fetchedUser._id,
              email: fetchedUser.email,
              role: fetchedUser.role,
            },
            process.env.token_key
          );
          return Promise.resolve({
            jwt: jwtToken,
            role: fetchedUser.role,
            newUser: false,
          });
        }
      } else {
        return Promise.reject("OTP expired.");
      }
    } else {
      return Promise.reject("Incorrect OTP.");
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

exports.sendOtp = async (email) => {
  try {
    const expiryTime = Date.now() + 10 * 60 * 1000;
    const otp = Math.floor(1000 + Math.random() * 9000);
    console.log(otp);
    const token = jwt.sign(
      { otp, email, expiryTime },
      process.env.EMAIL_OTP_SECRET_KEY
    );

    const response = sendOtpMail(email, otp);
    console.log(response);
    //   const msg = {
    //     to: email,
    //     from: {
    //       email: "admin@warpbay.co",
    //       name: "Warpbay",
    //     },
    //     templateId: "d-11f2864bdbb04928932a28fb1f115398",
    //     dynamicTemplateData: {
    //       otp: otp,
    //     },
    //   };

    //   const response = await sgMail
    //     .send(msg)
    //     .catch((error) => {
    //       console.log(error);
    //     });

    return Promise.resolve(token);
  } catch (error) {}

  // const otp = Math.floor(1000 + Math.random() * 9000);
};

//get user by jwt
exports.getUser = async (req, res) => {
  try {
    const user = req.user;
    const fetchedUser = await User.findById({ _id: user.id }).populate(
      "roomBookings"
    );

    if (!fetchedUser) {
      return Promise.reject("User Not Found");
    } else {
      return Promise.resolve({ user: fetchedUser });
    }
  } catch (error) {}
};

exports.updateUser = async (req, res) => {
  try {
    const user = req.user;
    let fetchedUser;
    if (!user) {
      fetchedUser = await User.findOne({ email: req.body.email });
    } else {
      fetchedUser = await User.findById({ _id: user.id });
    }
    const update = req.body.user;
    if (!fetchedUser) {
      return Promise.reject("User Not Found");
    } else {
      Object.assign(fetchedUser, update);
      await fetchedUser.save();
      return Promise.resolve({ user: fetchedUser });
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

exports.getUserBookings = async (req, res) => {
  try {
    const fetchedUser = await User.findById(req.user.id).populate({
      path: "roomBookings",
      populate: { path: "paymentInfo" },
    });
    const hotels = [];
    for (let i = 0; i < fetchedUser.roomBookings.length; i++) {
      const hotel = await Hotel.findOne({
        hotelId: fetchedUser.roomBookings[i].hotelId,
      }).populate("rooms");
      hotels.push(hotel);
    }

    if (!fetchedUser) {
      return Promise.reject("User Not Found");
    } else {
      // console.log(fetchedUser);
      return Promise.resolve({ user: fetchedUser, hotels: hotels });
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

exports.getUserBookingById = async (req, res) => {
  try {
    const { id } = req.params;
    let booking = await RoomBook.findById(id).populate({
      path: "paymentInfo customerId",
    });
    if (!booking) {
      return Promise.reject("Booking Not Found");
    }
    const hotel = await Hotel.findOne({ hotelId: booking.hotelId }).populate(
      "rooms"
    );

    booking = {
      ...booking._doc,
      hotelId: hotel,
    };

    return Promise.resolve({ booking: booking });
  } catch (error) {
    return Promise.reject(error);
  }
};
