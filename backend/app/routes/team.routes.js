module.exports = (app) => {
    const rooms = require('../controllers/room.controller.js');
    const baseUrl = "/api/v1/team"
    const auth = require("../middleware/auth.js");
    const { hasPermission, isXApiKey } = require("../middleware/permission.js");
    const user = require('../controllers/user.controller.js');
    const admin = require('../controllers/admin.controller.js');
    const hotels = require('../controllers/hotel.controller.js');
    const ROLE = 'TEAM';




    // Login
    app.post(`${baseUrl}/login`, user.loginUser);

    //verify otp
    app.post(`${baseUrl}/verifyOtp`, user.verifyOtp);

    //send otp
    app.post(`${baseUrl}/sendOtp`, user.sendOtp);

    // Get admin profile
    app.get(`${baseUrl}`, auth, hasPermission(ROLE), admin.findOneTeamConfig);


    // Display all hotel non review
    app.get(`${baseUrl}/hotels/non-review`, auth, hasPermission(ROLE), hotels.findAllHotelConfigNonReview);

    // update hotel by hotelId
    app.patch(`${baseUrl}/hotels/:hotelId`, auth, hasPermission(ROLE), hotels.updateHotelConfig);



    // Display all room non review
    app.get(`${baseUrl}/rooms/non-review`, auth, hasPermission(ROLE), rooms.findAllRoomConfigNonReview);

    // update room by roomId
    app.patch(`${baseUrl}/rooms/:roomId`, auth, hasPermission(ROLE), rooms.updateRoomConfig);

    // verify hotel by hotelId
    app.patch(`${baseUrl}/hotels/verify/:hotelId`, auth, hasPermission(ROLE), hotels.verifyHotel);

    // verify room by roomId
    app.patch(`${baseUrl}/rooms/verify/:roomId`, auth, hasPermission(ROLE), rooms.verifyRoom);


    //display one hotel by id

    app.get(`${baseUrl}/hotels/:hotelId`, auth, hasPermission(ROLE), hotels.findOneHotelConfig);
}
