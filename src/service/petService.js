const prisma = require("../config/pirsma");

exports.newpets = async (petData) => {
    return prisma.pet.create({
        data: petData,
    });
};
