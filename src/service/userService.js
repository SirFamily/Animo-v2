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