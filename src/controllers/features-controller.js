const { v4: uuidv4 } = require('uuid');
const createError = require('../utils/createError');
const featureService = require('../service/featureService');

exports.createFeature = async (req, res, next) => {
    try {
        const { name, price } = req.body;
        const { hid } = req.params; 
        if (!name || !price) {
            return next(createError(400, 'Name and price are required.'));
        }

        const newFeature = {
            name,
            price: parseFloat(price),
            hostId: hid
        };

        await featureService.createFeature(newFeature);
        res.status(201).json({ status: 'success', message: 'Feature created successfully', newFeature });
    } catch (err) {
        next(err);
    }
};

exports.getFeature = async (req, res, next) => {
    try {
        const { hid } = req.params; 
        // const uid = req.user.id;
        // const accommodation = await featureService.findAccommodationById(uid);
        // const { hid } = req.params; 
        // if (!accommodation) {
        //     return res.status(200).json({
        //         status: 'Accommodation not found',
        //         data: []
        //     });
        // }

        // const hostId = accommodation.id;
        const features = await featureService.findFeatureByHostId(hid);

        // if (!features || features.length === 0) {
        //     return res.status(200).json({
        //         status: 'No features found for this host',
        //         data: []
        //     });
        // }

        res.status(200).json({ status: 'success', data: features });
    } catch (err) {
        next(err);
    }
};

exports.updateFeature = async (req, res, next) => {
    try {
        const { fid } = req.params; 
        const { name, price, status } = req.body; 

        const feature = await featureService.findFeatureById(fid);

        if (!feature) {
            return next(createError(404, 'Feature not found.'));
        }

        const updatedData = {
            name: name !== undefined ? name : feature.name,
            price: price !== undefined ? parseFloat(price) : feature.price,
            status: status !== undefined ? status : feature.status
        };

        await featureService.updateFeature(fid, updatedData);

        const updatedFeature = await featureService.findFeatureById(fid);

        res.status(200).json({ 
            status: 'success', 
            message: 'Feature updated successfully', 
        });
    } catch (err) {
        next(err);
    }
};

exports.deleteFeature = async (req, res, next) => {
    try {
        const { fid } = req.params;
        await featureService.deleteFeatureById(fid);
        res.status(200).json({ status: 'success', message: 'Feature deleted successfully' });
    } catch (err) {
        next(err);
    }
};
