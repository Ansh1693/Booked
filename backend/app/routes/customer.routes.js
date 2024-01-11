module.exports = (app) => {
  const roomBook = require("../controllers/roomBook.controller.js");
  const customer = require("../controllers/customer.controller.js");
  const baseUrl = "/api/v1/customer";
  const auth = require("../middleware/auth.js");
  const { hasPermission } = require("../middleware/permission.js");
  const user = require("../controllers/user.controller.js");
  const ROLE = "CUSTOMER";

  // Register
  app.post(`${baseUrl}/register`, user.registerUser);

  // Login
  app.post(`${baseUrl}/login`, user.loginUser);

  //verify otp
  app.post(`${baseUrl}/verifyOtp`, user.verifyOtp);

  //send otp
  app.post(`${baseUrl}/sendOtp`, user.sendOtp);

  //get user
  app.get(`${baseUrl}/getUser`, auth, hasPermission(ROLE), user.getUser);

  // cancel room
  app.post(
    `${baseUrl}/roomCancel`,
    auth,
    hasPermission(ROLE),
    roomBook.saveRoomCancelConfig
  );

  // make a payment
  app.post(
    `${baseUrl}/roomBookPayment`,
    auth,
    hasPermission(ROLE),
    roomBook.roomBookPayment
  );

  // Get customer profile
  app.get(
    `${baseUrl}`,
    auth,
    hasPermission(ROLE),
    customer.findOneCustomerConfig
  );

  // Update customer profile
  app.patch(`${baseUrl}/user`, auth, hasPermission(ROLE), user.updateUser);

  //get user bookings
  app.get(
    `${baseUrl}/bookings`,
    auth,
    hasPermission(ROLE),
    user.getUserBookings
  );

  //get booking by id
  app.get(
    `${baseUrl}/bookings/:id`,
    auth,
    hasPermission(ROLE),
    user.getUserBookingById
  );
};
