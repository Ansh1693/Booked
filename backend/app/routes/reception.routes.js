module.exports = (app) => {
    const reception = require('../controllers/reception.controller.js');
    const baseUrl = "/api/v1/partner/reception"
    const auth = require("../middleware/auth.js");
    const { hasPermission } = require("../middleware/permission.js");
    const user = require('../controllers/user.controller.js');
    const roomBook = require('../controllers/roomBook.controller.js');
    const ROLE = 'RECEPTION';

    // login
    app.post(`${baseUrl}/login`, user.loginWithPass);

    // Get partner reception profile
    app.get(`${baseUrl}`, auth, hasPermission(ROLE), reception.findOnePartnerReceptionConfig);

    // Room book
    app.post(`${baseUrl}/roomBook`, auth, hasPermission(ROLE), roomBook.saveRoomBookConfig);

    // cancel room
    app.post(`${baseUrl}/roomCancel`, auth, hasPermission(ROLE), roomBook.saveRoomCancelConfig);

    // checkout room
    app.post(`${baseUrl}/roomCheckout`, auth, hasPermission(ROLE), roomBook.saveRoomCheckoutConfig);

    // Food Ordered
    app.post(`${baseUrl}/foodOrdered/:roomBookedId`, auth, hasPermission(ROLE), reception.foodOrdered);

    //get bookings
    app.post(`${baseUrl}/getBookings`, auth, hasPermission(ROLE), roomBook.getRoomBookConfig);

    //checkin
    app.post(`${baseUrl}/roomCheckin`, auth, hasPermission(ROLE), roomBook.saveRoomCheckInConfig);

    //get amount remaining
    app.post(`${baseUrl}/getAmountRemaining`, auth, hasPermission(ROLE), roomBook.getAmountRemaining);
}
