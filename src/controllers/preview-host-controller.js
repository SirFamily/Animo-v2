const previewhostService = require('../service/previewhostService');
const createError = require('../utils/createError');

exports.listPublishedHost = async (req, res, next) => {
    try {
        const hosts = await previewhostService.listPublishedHosts();
        res.status(200).json({
            status: 'success',
            data: hosts
        });
    } catch (err) {
        next(err);
    }
};
