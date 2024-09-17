const { BookingRequest, PetCountBooking, Payment, Room, Host, Pet, User } = require("../db/index");

exports.getBookingRequestsByUser = async (userId) => {
    const requests = await BookingRequest.findAll({
        where: {
            userId,
            bookingStatus: ['pending', 'confirmed']
        },
        include: [
            // { 
            //     model: Host,   // ดึงข้อมูล Host ที่เกี่ยวข้อง
            //     as: 'host'
            // },
            {
                model: Room,   // ดึงข้อมูล Room ที่เกี่ยวข้อง
                as: 'room',
                attributes: ['name'],
            },
            {
                model: Payment,  // ดึงข้อมูล Payment ที่เกี่ยวข้อง
                as: 'payments',
                attributes: ['amount'],
            },
            {
                model: PetCountBooking,  // ดึงข้อมูล PetCountBooking ที่เกี่ยวข้อง
                // include: [
                //     { 
                //         model: Pet,   // ดึงข้อมูล Pet ที่เกี่ยวข้องกับการจอง
                //         as: 'pet',
                //         attributes: ['petName'],
                //     }
                // ]
            },
        ]
    });
    return requests;
};


exports.getBookingRequestsDetailsById = async (reqId) => {
    const request = await BookingRequest.findOne({
        where: {
            id: reqId,
        },  // ค้นหาการจองตาม reqId
        include: [
            {
                model: Room,   // ดึงข้อมูลห้องที่เกี่ยวข้อง
                as: 'room',
                // attributes: ['name', 'type', 'price'],
            },
            {
                model: Payment,  // ดึงข้อมูลการชำระเงิน
                as: 'payments',
                // attributes: ['amount', 'status'],
            },
            {
                model: PetCountBooking,  // ดึงข้อมูล PetCountBooking
                include: [
                    {
                        model: Pet,  // ดึงข้อมูลสัตว์เลี้ยงที่เกี่ยวข้อง
                        as: 'pet',
                        // attributes: ['petName', 'species', 'breed', 'weight', 'height', 'gender'],
                    }
                ]
            },
            {
                model: Host,  // ดึงข้อมูลเจ้าของที่พัก
                as: 'host',
                include: [
                    {
                        model: User,  // ดึงข้อมูลสัตว์เลี้ยงที่เกี่ยวข้อง
                        as: 'user',
                        // attributes: ['petName', 'species', 'breed', 'weight', 'height', 'gender'],
                    }
                ]
            },
            {
                model: User,  // ดึงข้อมูลผู้จอง
                as: 'user',
                // attributes: ['id', 'name', 'email'],
            }
        ]
    });

    return request;
};

// ค้นหาที่พักโดยใช้ userId ของเจ้าของที่พัก
exports.findAccommodationByUserId = async (userId) => {
    return Host.findOne({
        where: { userId: userId }  // ค้นหาจาก userId ของเจ้าของที่พัก
    });
};

// ดึงข้อมูลการจองทั้งหมดที่เกี่ยวข้องกับที่พักที่มี hostId
exports.getBookingRequestsByAccommodationId = async (hostId) => {
    const requests = await BookingRequest.findAll({
        where: { hostId: hostId,
            bookingStatus: ['pending', 'confirmed']
         },  // ค้นหาการจองที่เกี่ยวข้องกับที่พัก (hostId)
        include: [
            {
                model: Room,   // ดึงข้อมูลห้องที่เกี่ยวข้องกับการจอง
                as: 'room',
                attributes: ['name'],
            },
            {
                model: Payment,  // ดึงข้อมูลการชำระเงินที่เกี่ยวข้องกับการจอง
                as: 'payments',
                attributes: ['amount'],
            },
            {
                model: PetCountBooking,  // ดึงข้อมูล PetCountBooking ที่เกี่ยวข้องกับการจอง
                include: [
                    {
                        model: Pet,   // ดึงข้อมูลสัตว์เลี้ยงที่จอง
                        as: 'pet',
                        attributes: ['petName'],
                    }
                ]
            },
        ]
    });
    return requests;
};



exports.updateBookingRequestStatus = async (reqId, newStatus) => {
    const validStatuses = ['pending', 'confirmed', 'reject', 'completed'];
    if (!validStatuses.includes(newStatus)) {
        throw new Error('Invalid status');
    }

    const [updated] = await BookingRequest.update(
        { bookingStatus: newStatus },
        { where: { id: reqId } }
    );

    if (updated === 0) {
        throw new Error('Booking request not found');
    }

    return updated;
};
