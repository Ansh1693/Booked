module.exports = (app) => {
    const roomBook = require('../controllers/roomBook.controller.js');
    const hotels = require('../controllers/hotel.controller.js');
    const rooms = require('../controllers/room.controller.js');
    const room = require('../services/roomBook.service.js');
    const baseUrl = "/api/v1/anonymous"
    const paymentService = require('../services/payment.service.js')
    const paymentController = require('../controllers/payment.controller.js')
    const cityController = require('../controllers/city.controller.js')

    //inititate payment
    app.post(`${baseUrl}/razorpay`, paymentController.razorpay);

    //get bookings from payment
    app.get(`${baseUrl}/payment/:paymentid`, paymentController.getBookingsfromPayment);

    //payment failure
    app.post(`${baseUrl}/payment/failure`,paymentService.paymentFailure, roomBook.saveRoomBookConfig);

    //refund payment
    app.post(`${baseUrl}/payment/refund`, paymentController.refundPayment);

    //check refund status
    app.get(`${baseUrl}/payment/refund/:paymentid`, paymentController.checkRefundStatus);

    // Book room
    app.post(`${baseUrl}/roomBook`,paymentService.verifyPayment, roomBook.saveRoomBookConfig);

    // Retrieve all hotels
    app.get(`${baseUrl}/hotels`, hotels.findAllHotelConfig)

    // Retrieve one hotel by hotelId
    app.get(`${baseUrl}/hotels/:hotelId`, hotels.findOneHotelConfig)

    // Retrieve all rooms
    app.get(`${baseUrl}/rooms`, rooms.findAllRoomConfig)

    // Retrieve one room by roomId
    app.get(`${baseUrl}/rooms/:roomId`, rooms.findOneRoomConfig)

    // Retrieve all room by hotelId
    app.get(`${baseUrl}/hotels/rooms/:hotelId`, rooms.findAllRoomConfigByHotelId)

    //create city
    app.post(`${baseUrl}/city`, cityController.create)

    //get all cities
    app.get(`${baseUrl}/city`, cityController.findAll)

    //get one city

    app.get(`${baseUrl}/city/:cityName`, cityController.findOne)

    //update city

    app.patch(`${baseUrl}/city/:cityName`, cityController.update)

}
