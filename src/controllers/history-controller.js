const HistoryService = require('../service/HistoryService');
const createError = require('../utils/createError');

exports.listHistory = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const history = await HistoryService.getBookingRequestsByUser(userId);

        // Fetch accommodation by user ID
        const accommodation = await HistoryService.findAccommodationByUserId(userId);

        // Check if accommodation exists before accessing its properties
        let historyowner = null;
        if (accommodation) {
            const hostId = accommodation.id;
            historyowner = await HistoryService.getBookingRequestsByAccommodationId(hostId);
        }

        res.status(200).json({
            status: 'success',
            datarent: history,
            dataowner: historyowner, 
        });
    } catch (error) {
        next(error);
    }
};


exports.getHistoryRequestsDetailsById = async (req, res, next) => {
    try {
        const { reqId } = req.params;
        console.log(reqId)
        const requestDetails = await HistoryService.getBookingRequestsDetailsById(reqId);

        res.status(200).json({
            status: 'success',
            data: requestDetails,
        });
    } catch (error) {
        next(error);
    }
};