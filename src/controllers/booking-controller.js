const createError = require("../utils/createError");
const bookingService = require("../service/bookingService");
const { v4: uuidv4 } = require("uuid");

exports.createBooking = async (req, res, next) => {
    const transaction = await bookingService.startTransaction(); // เริ่ม transaction
    try {
        const { hostId, roomId, userId, startDate, endDate, pets, paymentAmount } = req.body;

        if (!hostId || !roomId || !userId || !startDate || !endDate || !paymentAmount || !pets || pets.length === 0) {
            return next(createError(400, "Missing required booking details."));
        }

        const bookingId = uuidv4().replace(/-/g, '');  

        const bookingData = {
            id: bookingId,
            hostId,
            roomId,
            userId,
            startDate,
            endDate,
        };

        await bookingService.createBookingRequest(bookingData, transaction);
        for (const pet of pets) {
            const petCountData = {
                bookingId,
                petId: pet.petId,
                count: pet.count
            };
            await bookingService.createPetCountBooking(petCountData, transaction);
        }

        const paymentData = {
            id: uuidv4().replace(/-/g, ''),  
            bookingId,
            amount: parseFloat(paymentAmount),
            status: 'Pending'
        };

        await bookingService.createPayment(paymentData, transaction);
        await transaction.commit();

        res.status(201).json({
            status: "success",
            bookingId,
        });
    } catch (err) {
        await transaction.rollback();
        next(err);
    }
};
