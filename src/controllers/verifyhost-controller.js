const createError = require("../utils/createError");
const verifyHostService = require("../service/verifyhostService");

exports.updateVerification = async (req, res, next) => {
    try {
        const { id } = req.params;
        const {hostId, newStatus } = req.body;
        const adminId = req.admin.id; 

        const updatedRecord = await verifyHostService.updateVerificationStatus(id, hostId, adminId, newStatus);
console.log(id,hostId,newStatus,adminId)
        res.status(200).json({
            message: "Verification status updated successfully",
            data: updatedRecord,
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