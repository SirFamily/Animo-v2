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

        // ดึงข้อมูลที่พักที่เจ้าของเป็นผู้ดูแล โดยใช้ userId ของเจ้าของที่พัก
        const accommodation = await RequestService.findAccommodationByUserId(userId);
        
        if (!accommodation) {
            return res.status(200).json({
                status: 'Accommodation not found',
                data: []
            });
        }

        // ดึง id ของที่พักจาก accommodation (สมมติว่า accommodation ส่งกลับมาเป็น object และมี id)
        const hostId = accommodation.id; // ตรวจสอบว่าส่งกลับ id จริงๆ

        
        // ดึงข้อมูลการจองที่เกี่ยวข้องกับ hostId
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
