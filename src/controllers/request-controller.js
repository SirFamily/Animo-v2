const RequestService = require('../service/RequestService');

exports.listRequestDetails = async (req, res, next) => {
    try {
        const { uid } = req.params;
        const requests = await RequestService.getBookingRequestsByUser(uid);
        res.status(200).json({
            status: 'success',
            data: requests,
        });
    } catch (error) {
        next(error);
    }
};


exports.getBookingRequestsDetailsById = async (req, res, next) => {
    try {
        const { reqId } = req.params;
        const requestDetails = await RequestService.getBookingRequestsDetailsById(reqId);

        res.status(200).json({
            status: 'success',
            data: requestDetails,
        });
    } catch (error) {
        next(error);
    }
};

exports.listRequestForOwner = async (req, res, next) => {
    try {
        const { uid } = req.params;
        const accommodation = await RequestService.findAccommodationByUserId(uid);
        

        const hostId = accommodation.id;
        const requests = await RequestService.getBookingRequestsByAccommodationId(hostId);

        res.status(200).json({
            status: 'success',
            data: requests,
        });
    } catch (error) {
        next(error);
    }
};


exports.updateBookingRequestStatus = async (req, res, next) => {
    try {
        const { reqId } = req.params;
        const { status } = req.body;  

        await RequestService.updateBookingRequestStatus(reqId, status);

        res.status(200).json({
            status: 'success',
            message: 'Booking request status updated successfully',
        });
    } catch (error) {
        next(error);
    }
};
