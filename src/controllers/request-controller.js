const RequestService = require('../service/RequestService'); 
const createError = require('../utils/createError');

exports.listRequestDetails = async (req, res, next) => {
    try {
        // รับ userId จาก token (เช่นจาก middleware authenticate)
        const userId = req.user.id;

        // ดึงข้อมูลการจองที่เกี่ยวข้องกับ userId นี้เท่านั้น
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

        // ดึงข้อมูลการจองที่เกี่ยวข้องกับ reqId
        const requestDetails = await RequestService.getBookingRequestsDetailsById(reqId);

        // ตรวจสอบว่าพบข้อมูลการจองหรือไม่
        if (!requestDetails) {
            return next(createError(404, "Booking request not found"));
        }

        res.status(200).json({
            status: 'success',
            data: requestDetails,
        });
    } catch (error) {
        next(error);
    }
};
