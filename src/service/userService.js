// const prisma = require("../config/pirsma");
const {User} = require("../db/index")

// Function to create a new user
exports.createUser = async (userData) => {
    return await User.create(userData);
};

// Function to get a user by email
exports.getUserByEmail = async (email) => {
    return await User.findOne({ where: { email } });
};

// Function to find a user by ID
exports.findUserById = async (id) => {
    return User.findOne({ where: { id } });
};

// Function to update a user
exports.updateUser = async (id, updatedData) => {
    return User.update(updatedData, {
        where: { id: id },
    });
};