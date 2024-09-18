const { BookingRequest, PetCountBooking, Payment, Room, Host, Pet, User } = require("../db/index");

exports.getBookingRequestsByUser = async (userId) => {
    const requests = await BookingRequest.findAll({
        where: {
            userId,
            bookingStatus: ['reject', 'completed']
        },
        include: [
            // { 
            //     model: Host,   
            //     as: 'host'
            // },
            {
                model: Room,   
                as: 'room',
                attributes: ['name'],
            },
            {
                model: Payment,  
                as: 'payments',
                attributes: ['amount'],
            },
            {
                model: PetCountBooking,  
                // include: [
                //     { 
                //         model: Pet,   
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
        }, 
        include: [
            {
                model: Room,   
                as: 'room',
                // attributes: ['name', 'type', 'price'],
            },
            {
                model: Payment,  
                as: 'payments',
                // attributes: ['amount', 'status'],
            },
            {
                model: PetCountBooking, 
                include: [
                    {
                        model: Pet, 
                        as: 'pet',
                        // attributes: ['petName', 'species', 'breed', 'weight', 'height', 'gender'],
                    }
                ]
            },
            {
                model: Host, 
                as: 'host',
                include: [
                    {
                        model: User,  
                        as: 'user',
                        // attributes: ['petName', 'species', 'breed', 'weight', 'height', 'gender'],
                    }
                ]
            },
            {
                model: User,  
                as: 'user',
                // attributes: ['id', 'name', 'email'],
            }
        ]
    });

    return request;
};

exports.findAccommodationByUserId = async (userId) => {
    return Host.findOne({
        where: { userId: userId }  
    });
};

exports.getBookingRequestsByAccommodationId = async (hostId) => {
    const requests = await BookingRequest.findAll({
        where: { hostId: hostId,
            bookingStatus: ['reject', 'completed']
         },  
        include: [
            {
                model: Room,  
                as: 'room',
                attributes: ['name'],
            },
            {
                model: Payment,  
                as: 'payments',
                attributes: ['amount'],
            },
            {
                model: PetCountBooking,  
                include: [
                    {
                        model: Pet,   
                        as: 'pet',
                        attributes: ['petName'],
                    }
                ]
            },
        ]
    });
    return requests;
};


