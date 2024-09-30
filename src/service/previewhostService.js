const { Host, PhotosHost, Room, PhotosRoom, SupportPet, User ,Features } = require("../db/index");
const { Op } = require('sequelize');

exports.listPublishedHosts = async (userId) => {
    return Host.findAll({
        where: {
            publish: true,
            userId: { [Op.ne]: userId }
        },

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
                        attributes: ['id', 'name']
                    }
                ]
            },
            {
                model: User,
                as: 'user',
                attributes: ['firstName', 'url', 'lastName'] 
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
                        attributes: ['id', 'name']
                    }
                ]
            },
            {
                model: User,
                as: 'user',
                attributes: ['firstName', 'url', 'lastName'] 
            },
            {
                model: Features,
                as: 'features',
                attributes: ['id', 'name', 'price']
            }
            
        ]
    });
};