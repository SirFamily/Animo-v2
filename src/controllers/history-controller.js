const HistoryService = require('../service/HistoryService');

exports.listHistory = async (req, res, next) => {
    try {
        const { uid } = req.params;
        const history = await HistoryService.getBookingRequestsByUser(uid);

        const accommodation = await HistoryService.findAccommodationByUserId(uid);

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