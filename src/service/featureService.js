const { Features, Host } = require('../db/index');

// ฟังก์ชันสร้าง Feature ใหม่
exports.createFeature = async (featureData) => {
    return Features.create(featureData);
};

// ฟังก์ชันอัปเดต Feature
exports.updateFeature = async (id, updatedData) => {
    return Features.update(updatedData, { where: { id } });
};

// ฟังก์ชันลบ Feature ตาม ID
exports.deleteFeatureById = async (id) => {
    return Features.destroy({ where: { id } });
};

// ฟังก์ชันค้นหา Features ตาม hostId
exports.findFeatureByHostId = async (hostId) => {
    return Features.findAll({ where: { hostId } });
};

// ฟังก์ชันค้นหา Accommodation ตาม userId
exports.findAccommodationById = async (id) => {
    return Host.findOne({ where: { userId: id } });
};

// ฟังก์ชันค้นหา Feature ตาม ID (แก้ไขที่ขาดไป)
exports.findFeatureById = async (id) => {
    return Features.findOne({ where: { id } });
};
