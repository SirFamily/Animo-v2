const { Host, PhotosHost, Room, PhotosRoom, SupportPet, User } = require("../db/index");

exports.listPublishedHosts = async () => {
    return Host.findAll({
        where: { publish: true },
        include: [
            {
                model: PhotosHost,
                as: 'photosHost',
                attributes: ['url']
            },
            {
                model: Room,
                as: 'rooms',
                attributes: ['id', 'name', 'quantity', 'type', 'price'],
                include: [
                    {
                        model: PhotosRoom,
                        as: 'photosRoom',
                        attributes: ['url']
                    },
                    {
                        model: SupportPet,
                        as: 'supportPets',
                        attributes: ['id', 'name', 'description']
                    }
                ]
            },
            {
                model: User,
                as: 'user',
                attributes: ['firstName', 'url', 'lastName'] // ดึงเฉพาะชื่อเจ้าของที่พัก
            }
        ]
    });
};

exports.listHostByID = async (hid) => {
    return Host.findOne({
        where: { id: hid },
        include: [
            {
                model: PhotosHost,
                as: 'photosHost',
                attributes: ['url']
            },
            {
                model: Room,
                as: 'rooms',
                attributes: ['id', 'name', 'quantity', 'type', 'price'],
                include: [
                    {
                        model: PhotosRoom,
                        as: 'photosRoom',
                        attributes: ['url']
                    },
                    {
                        model: SupportPet,
                        as: 'supportPets',
                        attributes: ['id', 'name', 'description']
                    }
                ]
            },
            {
                model: User,
                as: 'user',
                attributes: ['firstName', 'url', 'lastName'] // ดึงเฉพาะชื่อเจ้าของที่พัก
            }
        ]
    });
};