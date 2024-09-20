const { BookingRequest, PetCountBooking, BookingFeatures, Payment, Room, Host, Pet, User, Features } = require("../db/index");

exports.getBookingRequestsByUser = async (userId) => {
    const requests = await BookingRequest.findAll({
        where: {
            userId,
            bookingStatus: ['pending', 'confirmed']
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
            },
            {
                model: BookingFeatures,
                as : 'bookingFeatures',
                include: [
                    {
                        model: Features,
                        as: 'feature',
                        // attributes: ['name', 'description'],
                        }
                        ]
            },
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
            bookingStatus: ['pending', 'confirmed']
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
