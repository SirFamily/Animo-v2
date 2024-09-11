const { Host, PhotosHost, Room, PhotosRoom, SupportPet } = require("../db/index");

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
            }
        ]
    });
};