const createError = require("../utils/createError");
const bookingService = require("../service/bookingService");
const { v4: uuidv4 } = require("uuid");

exports.createBooking = async (req, res, next) => {
    const transaction = await bookingService.startTransaction(); // เริ่ม transaction
    try {
        const { hostId, roomId, userId, startDate, endDate, pets, paymentAmount, features } = req.body;

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

        // Create Booking Request
        await bookingService.createBookingRequest(bookingData, transaction);

        // Insert Pets
        for (const pet of pets) {
            const petCountData = {
                bookingId,
                petId: pet.petId,
                count: pet.count || 1, // สมมติว่าจำนวนสัตว์เลี้ยงเป็น 1 หากไม่ระบุ
            };
            await bookingService.createPetCountBooking(petCountData, transaction);
        }

        // Insert Payment
        const paymentData = {
            id: uuidv4().replace(/-/g, ''),  
            bookingId,
            amount: parseFloat(paymentAmount),
            status: 'Pending'
        };
        await bookingService.createPayment(paymentData, transaction);

        // Insert Booking Features (New Addition)
        if (features && features.length > 0) {
            for (const featureId of features) { // แก้ไขจาก feature.id เป็น featureId ตรงนี้
                const bookingFeatureData = {
                    bookingId,
                    featureId, // ใช้ featureId โดยตรง
                };
                await bookingService.createBookingFeatures(bookingFeatureData, transaction);
            }
        }

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
