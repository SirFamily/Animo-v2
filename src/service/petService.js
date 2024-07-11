const prisma = require("../config/pirsma");

exports.newpets = async (petData) => {
    return prisma.pet.create({
        data: petData,
    });
};

exports.listpets = async (userId) => {
    return prisma.pet.findMany({
        where: userId, 
    });
};
