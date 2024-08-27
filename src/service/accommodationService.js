const { Host } = require("../db/index");
const { PhotosHost } = require("../db/index");
const {Room} = require("../db/index");
const { PhotosRoom } = require("../db/index");

// Function to create a new accommodation
exports.createAccommodation = async (accommodationData) => {
    return Host.create(accommodationData);
};

// Function to list accommodations by user ID
exports.listAccommodations = async (userId) => {
    return Host.findAll({
        where: { userId: userId }
    });
};

// Function to update accommodation by ID
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
    return Host.destroy({ where: { id } });
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


// ส่วนที่เพิ่ม
exports.listAccommodationsWithImages = async (userId) => {
    return Host.findAll({
        where: { userId: userId },
        include: [
            {
                model: PhotosHost,
                as: 'photosHost',
                attributes: ['url'] 
            },
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
