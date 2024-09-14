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

// Function to pats update ID
exports.updatePet = async (id, updatedData) => {
    return Pet.update(updatedData, {
        where: { id: id }
    });
};

exports.findPetById = async (id) => {
    return Pet.findOne({
        where: { id }
    });
};

exports.deletePetById = async (id) => {
    return Pet.destroy({ where: { id } });
};

exports.listPetByIdUser = async(id) =>{
    return Pet.findAll({
        where: { userId: id }
        });
}