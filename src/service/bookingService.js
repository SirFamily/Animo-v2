const { BookingRequest, PetCountBooking, Payment, sequelize } = require("../db/index");

exports.startTransaction = () => {
    return sequelize.transaction();
};

exports.createBookingRequest = async (bookingData, transaction) => {
    return BookingRequest.create(bookingData, { transaction });
};

exports.createPetCountBooking = async (petCountData, transaction) => {
    return PetCountBooking.create(petCountData, { transaction });
};

exports.createPayment = async (paymentData, transaction) => {
    return Payment.create(paymentData, { transaction });
};
