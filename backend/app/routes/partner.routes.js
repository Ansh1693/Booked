module.exports = (app) => {
    const rooms = require('../controllers/room.controller.js');
    const partner = require('../controllers/partner.controller.js');
    const baseUrl = "/api/v1/partner"
    const auth = require("../middleware/auth.js");
    const { hasPermission } = require("../middleware/permission.js");
    const user = require('../controllers/user.controller.js');
    const ROLE = 'PARTNER';
    const hotels = require('../controllers/hotel.controller.js');

    // Register
    app.post(`${baseUrl}/register`, user.registerUser);

    // Login
    app.post(`${baseUrl}/login`, user.loginUser);

    // Add User
    app.post(`${baseUrl}/adduser`, auth, hasPermission(ROLE), user.addUser);

    // Get partner profile
    app.get(`${baseUrl}`, auth, hasPermission(ROLE), partner.findOnePartnerConfig);

    // Add hotel
    app.post(`${baseUrl}/hotels`, auth, hasPermission(ROLE), hotels.saveHotelConfig);

    // Add room
    app.post(`${baseUrl}/rooms`, auth, hasPermission(ROLE), rooms.saveRoomConfig);

    // Add dormitory room
    app.post(`${baseUrl}/dormitoryRooms`, auth, hasPermission(ROLE), rooms.saveDormitoryRoomConfig);

    // Get All room
    app.get(`${baseUrl}/rooms`, auth, hasPermission(ROLE), rooms.findAllRoomConfig);

    // Get One room by roomId
    app.get(`${baseUrl}/rooms/:roomId`, auth, hasPermission(ROLE), rooms.findOneRoomConfig);

    // update room by roomId
    app.patch(`${baseUrl}/rooms/:roomId`, auth, hasPermission(ROLE), rooms.updateRoomConfig);
}
