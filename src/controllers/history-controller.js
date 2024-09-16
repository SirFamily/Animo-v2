const HistoryService = require('../service/HistoryService');
const createError = require('../utils/createError');

exports.getHistoryDetails = async (req, res, next) => {
    try {

        res.status(200).json({
            status: 'success',
            data: result,
        });

    } catch (error) {
        next(error);
    }
};
