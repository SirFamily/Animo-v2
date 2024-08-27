const { ExtraFeatures } = require('../db/index');

exports.createFeature = async (featureData) => {
    return ExtraFeatures.create(featureData);
};

exports.findFeatureById = async (id) => {
    return ExtraFeatures.findOne({ where: { id } });
};

exports.updateFeature = async (id, updatedData) => {
    return ExtraFeatures.update(updatedData, { where: { id } });
};

exports.deleteFeatureById = async (id) => {
    return ExtraFeatures.destroy({ where: { id } });
};
