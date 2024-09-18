const RequestService = require('../service/RequestService');
const createError = require('../utils/createError');

exports.listRequestDetails = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const requests = await RequestService.getBookingRequestsByUser(userId);
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

        if (!requestDetails) {
            return res.status(200).json({
                status: 'Booking requestss not found',
                data: []
            });
        }

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
        const userId = req.user.id;
        const accommodation = await RequestService.findAccommodationByUserId(userId);
        
        if (!accommodation) {
            return res.status(200).json({
                status: 'Accommodation not found',
                data: []
            });
        }

        const hostId = accommodation.id;
        const requests = await RequestService.getBookingRequestsByAccommodationId(hostId);

        if (requests.length === 0) {
            return res.status(200).json({
                status: 'No booking requests found for this accommodation',
                data: []
            });
        }

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
