const { BookingRequest, PetCountBooking, Payment, sequelize } = require("../db/index");

// เริ่ม transaction
exports.startTransaction = () => {
    return sequelize.transaction();
};

// ฟังก์ชันสร้าง BookingRequest
exports.createBookingRequest = async (bookingData, transaction) => {
    return BookingRequest.create(bookingData, { transaction });
};

// ฟังก์ชันสร้าง PetCountBooking
exports.createPetCountBooking = async (petCountData, transaction) => {
    return PetCountBooking.create(petCountData, { transaction });
};

// ฟังก์ชันสร้าง Payment
exports.createPayment = async (paymentData, transaction) => {
    return Payment.create(paymentData, { transaction });
};
