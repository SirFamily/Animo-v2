const db = require('../db/index'); // นำเข้าเชื่อมต่อกับ database

exports.getBookingDetails = async (bookingId, currentUserId) => { // เพิ่ม currentUserId เป็นพารามิเตอร์
    try {
        const bookingRequest = await db.BookingRequest.findOne({
            where: { id: bookingId }, // ค้นหาด้วย bookingId
            include: [
                {
                    model: db.Room,
                    as: 'room',
                    include: [
                        {
                            model: db.Host,
                            as: 'host',
                            include: [{ model: db.User, as: 'user' }]
                        }
                    ]
                },
                {
                    model: db.User,
                    as: 'user'
                },
                {
                    model: db.PetCountBooking,
                    as: 'pet_count_bookings',
                    include: [
                        {
                            model: db.Pet,
                            as: 'pet'
                        }
                    ]
                },
                {
                    model: db.Payment,
                    as: 'payments'
                }
            ]
        });

        // ถ้าไม่มี BookingRequest
        if (!bookingRequest) {
            return null;
        }

        // ตรวจสอบว่า userId ตรงกับ host's userId หรือไม่
        if (bookingRequest.room.host.user.id !== currentUserId) {
            return null; // ถ้าไม่ตรง ให้คืนค่า null
        }

        return bookingRequest; // ส่งข้อมูลกลับเมื่อเงื่อนไขผ่าน
    } catch (error) {
        console.error("Error fetching booking details:", error);
        throw new Error('Error fetching booking details');
    }
};
