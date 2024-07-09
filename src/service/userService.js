const prisma = require("../config/pirsma");

exports.createUser = async (userData) => {
    return await prisma.user.create({
        data: userData
    });
};

exports.getUserByEmail = async (email) => {
    return await prisma.user.findUnique({
        where: { email }
    });
};