const verifyHostService = require("../service/verifyhostService");

exports.updateVerification = async (req, res, next) => {
    try {
        const { id, adminId } = req.params;  
        const { newStatus } = req.body;   

        if (!newStatus) {
            return res.status(400).json({ message: "New status is required" });
        }

        const updatedRecord = await verifyHostService.updateVerificationStatus({ id, adminId, newStatus });

        res.status(200).json({
            message: "Verification status updated successfully",
            data: updatedRecord,
        });
    } catch (error) {
        next(error);
    }
};

exports.listPending = async (req, res, next) => {
    try {
        const list = await verifyHostService.listVerifyByPending();
        res.status(200).json({
            message: "List of verifications retrieved successfully",
            data: list,
        });
    } catch (error) {
        next(error);
    }
};

exports.listRejected = async (req, res, next) => {
    try {
        const list = await verifyHostService.listVerifyByRejected();
        res.status(200).json({
            message: "List of rejected verifications retrieved successfully",
            data: list,
        });
    } catch (error) {
        next(error);
    }
};

exports.listApproved = async (req, res, next) => {
    try {
        const list = await verifyHostService.listVerifyByApprove();
        res.status(200).json({
            message: "List of approved verifications retrieved successfully",
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
            message: "Detail of verifications retrieved successfully",
            data: detail,
        });
    } catch (error) {
        next(error);
    }
};
