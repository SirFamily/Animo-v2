const createError = require('../utils/createError');

exports.listALlHost = async (req, res, next) => {
    try {

        json({ status: 'success'});
    } catch (err) {
        next(err);
    }
};