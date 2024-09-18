const { User } = require("../db/index");

exports.createUser = async (userData) => {
    return await User.create(userData);
};

exports.getUserByEmail = async (email) => {
    return await User.findOne({ where: { email } });
};

exports.findUserById = async (id) => {
    return User.findOne({ where: { id } });
};

exports.updateUser = async (id, updatedData) => {
    return User.update(updatedData, {
        where: { id: id },
    });
};
