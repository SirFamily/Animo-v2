const { Room } = require("../db/index");
const { Host } = require("../db/index");
const { PhotosRoom } = require("../db/index");

// Function to create a new room
exports.createRoom = async (roomData) => {
    return Room.create(roomData);
};

// Function to list rooms by host ID
exports.listRooms = async (hostId) => {
    return Room.findAll({
        where: { hostId: hostId }
    });
};

// Function to update room by ID
exports.updateRoom = async (id, updatedData) => {
    return Room.update(updatedData, {
        where: { id: id }
    });
};

exports.findRoomById = async (id) => {
    return Room.findOne({
        where: { id }
    });
};

exports.deleteRoomById = async (id) => {
    return Room.destroy({ where: { id } });
};

exports.findAccommodationById = async (id) => {
    return Host.findOne({
        where: { userId:id }
    });
};

exports.uploadPhotosRoom = async ({ images, rid }) => {
    const photoData = images.map(image => ({
        url: image.url,
        roomId: rid,
    }));
    return PhotosRoom.bulkCreate(photoData);
};
