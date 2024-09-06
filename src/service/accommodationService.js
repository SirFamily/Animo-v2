const { Host } = require("../db/index");
const { PhotosHost } = require("../db/index");
const { Room } = require("../db/index");
const { PhotosRoom } = require("../db/index");

exports.createAccommodation = async (accommodationData) => {
    return Host.create(accommodationData);
};

exports.listAccommodations = async (userId) => {
    return Host.findAll({
        where: { userId: userId }
    });
};

exports.updateAccommodation = async (id, updatedData) => {
    return Host.update(updatedData, {
        where: { id: id }
    });
};

exports.findAccommodationById = async (id) => {
    return Host.findOne({
        where: { id }
    });
};

exports.deleteAccommodationById = async (id) => {
    await PhotosHost.destroy({
        where: { hostId: id }
    });

    return Host.destroy({
        where: { id: id }
    });
};


exports.uploadPhotosHost = async ({ images, hostId }) => {
    const photoData = images.map(image => ({
        url: image.url,
        hostId: hostId,
    }));

    return PhotosHost.bulkCreate(photoData);
};


exports.getImagesByHostId = async (hostId) => {
    return PhotosHost.findAll({
        where: { hostId }
    });
};

exports.listAccommodationsWithImages = async (userId) => {
    return Host.findAll({
        where: { userId: userId },
        include: [
            {
                model: PhotosHost,
                as: 'photosHost',
                attributes: ['url']
            },
            // Uncomment if you want to include rooms and their photos as well
            // {
            //     model: Room,
            //     as: 'rooms',  // Alias for rooms
            //     include: [
            //         {
            //             model: PhotosRoom,
            //             as: 'roomPhotos',  // Alias for photos of the room
            //             attributes: ['url']  // Fetch room photos
            //         }
            //     ]
            // },
        ]
    });
};


exports.findAccommodationForDelete = async (id) => {
    return Host.findOne({
        where: { id: id },
        include: [

            {
                model: Room,
                as: 'rooms',  
                
            },
        ]
    });
};