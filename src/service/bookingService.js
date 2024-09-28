const { BookingRequest, PetCountBooking, Payment, BookingFeatures } = require("../db/index");


exports.createBookingRequest = async (bookingData, transaction) => {
    return BookingRequest.create(bookingData);
};

exports.createPetCountBooking = async (petCountData, transaction) => {
    return PetCountBooking.create(petCountData);
};

exports.createPayment = async (paymentData, transaction) => {
    return Payment.create(paymentData);
};

exports.createBookingFeatures = async (bookingFeatureData, transaction) => {
    return BookingFeatures.create(bookingFeatureData);
};
