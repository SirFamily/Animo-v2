const createError = require("../utils/createError");
const verifyHostService = require("../service/verifyhostService");

exports.updateVerification = async (req, res, next) => {
    try {
        const { id } = req.params;   // Get ID from request params
        const { } = req.body;   // Get newStatus from request body
        const adminId = req.admin.id;  // Get adminId from request (assuming this is set in middleware)
        
        // Ensure that you pass an object with the required fields
        const updatedRecord = await verifyHostService.updateVerificationStatus({ id, adminId, newStatus });
        
        console.log(id, newStatus, adminId);  // Log to debug (removed hostId)
        
        res.status(200).json({
            message: "Verification status updated successfully",
            data: updatedRecord
        });
    } catch (error) {
        next(error);
    }
};


exports.list = async (req, res, next) => {
    try {
        const adminId = req.admin.id;

        const list = await verifyHostService.listVerifyByPending();
        res.status(200).json({
            message: "List of verifications retrieved successfully",
            data: list,
        });
    } catch (error) {
        next(error);
    }
};

exports.detail = async (req, res, next) => {
    try {
        const { id } = req.params;

        const detail = await verifyHostService.verifyByDetail(id);
        res.status(200).json({
            message: "detail of verifications retrieved successfully",
            data: detail,
        });
    } catch (error) {
        next(error);
    }
};