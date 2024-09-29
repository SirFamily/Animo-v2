const { v4: uuidv4 } = require('uuid');
const featureService = require('../service/featureService');

exports.createFeature = async (req, res, next) => {
    try {
        const { name, price } = req.body;
        const { hid } = req.params; 

        if (!name || !price) {
            return res.status(400).json({ message: 'Name and price are required.' });
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

        const features = await featureService.findFeatureByHostId(hid);

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
            return res.status(404).json({ message: 'Feature not found.' });
        }

        const updatedData = {
            name: name !== undefined ? name : feature.name,
            price: price !== undefined ? parseFloat(price) : feature.price,
            status: status !== undefined ? status : feature.status
        };

        await featureService.updateFeature(fid, updatedData);

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
