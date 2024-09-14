const { BookingRequest,PetCountBooking,Payment } = require("../db/index");

exports.createBooking = async (bookingData) => {
    return Pet.create(bookingData);
};
