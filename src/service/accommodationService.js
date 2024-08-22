const { Host } = require("../db/index");

// Function to create a new accommodation
exports.createAccommodation = async (accommodationData) => {
    return Host.create(accommodationData);
};

// Function to list accommodations by user ID
exports.listAccommodations = async (userId) => {
    return Host.findAll({
        where: { userId: userId }
    });
};

// Function to update accommodation by ID
exports.updateAccommodation = async (id, updatedData) => {
    return Host.update(updatedData, {
        where: { id: id }
    });
};

exports.findAccommodationById = async (id) => {
    return Host.findOne({
        where: { id }
    });
};

exports.deleteAccommodationById = async (id) => {
    return Host.destroy({ where: { id } });
};
