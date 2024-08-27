const { v4: uuidv4 } = require('uuid');
const createError = require('../utils/createError');
const featuresService = require('../service/featuresService');

exports.createFeature = async (req, res, next) => {
    try {
        const { name, price, status, hostId } = req.body;

        if (!name || !price || !hostId) {
            return next(createError(400, 'Name, price, and host ID are required.'));
        }

        const id = uuidv4().replace(/-/g, '');
        const newFeature = {
            id,
            name,
            price: parseFloat(price),
            status,
            hostId
        };

        await featuresService.createFeature(newFeature);
        res.status(201).json({ status: 'success', message: 'Feature created successfully' });
    } catch (err) {
        next(err);
    }
};

exports.updateFeature = async (req, res, next) => {
    try {
        const { fid } = req.params;
        const { name, price, status } = req.body;

        const feature = await featuresService.findFeatureById(fid);

        if (!feature) {
            return next(createError(404, 'Feature not found.'));
        }

        const updatedData = {
            name: name !== undefined ? name : feature.name,
            price: price !== undefined ? parseFloat(price) : feature.price,
            status: status !== undefined ? status : feature.status
        };

        await featuresService.updateFeature(fid, updatedData);
        const updatedFeature = await featuresService.findFeatureById(fid);

        res.status(200).json({ status: 'success', message: 'Feature updated successfully', feature: updatedFeature });
    } catch (err) {
        next(err);
    }
};

exports.deleteFeature = async (req, res, next) => {
    try {
        const { fid } = req.params;
        await featuresService.deleteFeatureById(fid);
        res.status(200).json({ status: 'success', message: 'Feature deleted successfully' });
    } catch (err) {
        next(err);
    }
};
