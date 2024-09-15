const HistoryService = require('../service/HistoryService');
const createError = require('../utils/createError');

exports.getHistoryDetails = async (req, res, next) => {
    try {
        const { bookingId } = req.params;
        const currentUserId = req.user.id; // นำ currentUserId จาก middleware ที่ authenticate

        // ตรวจสอบว่าได้ส่ง bookingId มาหรือไม่
        if (!bookingId) {
            return next(createError(400, 'Booking ID is required'));
        }

        // เรียกใช้ service เพื่อดึงข้อมูล โดยส่ง currentUserId ไปด้วย
        const bookingRequest = await HistoryService.getBookingDetails(bookingId, currentUserId);

        // ถ้าไม่เจอข้อมูลหรือเงื่อนไขไม่ผ่าน
        if (!bookingRequest) {
            return next(createError(404, 'Booking Request not found or not authorized'));
        }
         // กรอง payments ที่มี status เป็น "Cancel" หรือ "Succed"
         const filteredPayments = bookingRequest.payments.filter(payment => 
            payment.status === "Cancel" || payment.status === "Succed"
        );

        // ตรวจสอบว่ามี payments ที่ตรงตามเงื่อนไขหรือไม่ ถ้าไม่มีก็ไม่แสดงข้อมูลใด ๆ
        if (filteredPayments.length === 0) {
            return next(createError(404, 'No payments found with Cancel or Succed status'));
        }

        // กำหนดโครงสร้างข้อมูลที่ต้องการส่งกลับ
        const result = {
            id: bookingRequest.id,
            hostId: bookingRequest.hostId,
            roomId: bookingRequest.roomId,
            userId: bookingRequest.userId,
            startDate: bookingRequest.startDate,
            endDate: bookingRequest.endDate,
            createdAt: bookingRequest.createdAt,
            room: {
                id: bookingRequest.room.id,
                name: bookingRequest.room.name,
                quantity: bookingRequest.room.quantity,
                type: bookingRequest.room.type,
                price: bookingRequest.room.price,
                host: {
                    id: bookingRequest.room.host.id,
                    name: bookingRequest.room.host.name,
                    type: bookingRequest.room.host.type,
                    address: bookingRequest.room.host.address,
                    lat: bookingRequest.room.host.lat,
                    long: bookingRequest.room.host.long,
                    description: bookingRequest.room.host.description,
                    publish: bookingRequest.room.host.publish,
                    user: {
                        id: bookingRequest.room.host.user.id,
                        firstName: bookingRequest.room.host.user.firstName,
                        lastName: bookingRequest.room.host.user.lastName,
                        email: bookingRequest.room.host.user.email,
                        phone: bookingRequest.room.host.user.phone,
                        birthday: bookingRequest.room.host.user.birthday,
                        address: bookingRequest.room.host.user.address,
                        url: bookingRequest.room.host.user.url,
                    }
                }
            },
            user: {
                id: bookingRequest.user.id,
                firstName: bookingRequest.user.firstName,
                lastName: bookingRequest.user.lastName,
                email: bookingRequest.user.email,
                phone: bookingRequest.user.phone,
                birthday: bookingRequest.user.birthday,
                address: bookingRequest.user.address,
                url: bookingRequest.user.url,
            },
            pet_count_bookings: bookingRequest.pet_count_bookings.map(petBooking => ({
                id: petBooking.id,
                bookingId: petBooking.bookingId,
                petId: petBooking.petId,
                count: petBooking.count,
                createdAt: petBooking.createdAt,
                pet: {
                    id: petBooking.pet.id,
                    petName: petBooking.pet.petName,
                    species: petBooking.pet.species,
                    breed: petBooking.pet.breed,
                    weight: petBooking.pet.weight,
                    height: petBooking.pet.height,
                    gender: petBooking.pet.gender,
                    birthday: petBooking.pet.birthday,
                    url: petBooking.pet.url,
                }
            })),
            payments: bookingRequest.payments.map(payment => ({
                id: payment.id,
                bookingId: payment.bookingId,
                amount: payment.amount,
                status: payment.status,
                createdAt: payment.createdAt,
            }))
        };

        // ส่งผลลัพธ์ที่ได้กลับไปยัง client
        res.status(200).json({
            status: 'success',
            data: result,
        });

    } catch (error) {
        next(error);
    }
};
