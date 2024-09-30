const { Room } = require("../db/index");
const { Host } = require("../db/index");
const { PhotosRoom } = require("../db/index");
const {SupportPet} = require("../db/index");

exports.createRoom = async (roomData) => {
    return Room.create(roomData);
};

exports.createSupportPet = async (roomData) => {
    return SupportPet.create(roomData);
};

exports.listRooms = async (hostId) => {
    return Room.findAll({
        where: { hostId: hostId }
    });
};

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
    await PhotosRoom.destroy({
        where: { roomId: id }
    });

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

exports.getPhotosByRoomId = async (roomId) => {
    return PhotosRoom.findAll({
        where: { roomId }
    });
};

exports.listRoomsWithImages = async (hid) => {
    return Room.findAll({
        where: { host_id: hid },
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
    });
};
