const { Pet } = require("../db/index");

// Function to create a new pet
exports.newpets = async (petData) => {
    return Pet.create(petData);
};

// Function to list pets by user ID
exports.listpets = async (userId) => {
    return Pet.findAll({
        where: { userId: userId }
    });
};
