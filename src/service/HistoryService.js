const { BookingRequest, PetCountBooking, Payment, Room, Host, User,Pet } = require("../db/index");

exports.getBookingHistoryByUser = async (userId) => {
    const requests = await BookingRequest.findAll({
        where: { userId }, 
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
