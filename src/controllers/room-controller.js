const createError = require("../utils/createError");
const roomService = require("../service/roomService");
const { v4: uuidv4 } = require("uuid");
const cloudUpload = require("../utils/cloudUpload");

exports.createRoom = async (req, res, next) => {
    try {
        const {
            name,
            quantity,
            type,
            price,
            supportPetName,  // New: Support pet name field
            supportPetDescription // New: Support pet description field
        } = req.body;

        if (!name || !quantity || !type || !price ) {
            return next(createError(400, 'Name, quantity, type, and price are required.'));
        }

        const imagexPromiseArray = req.files.map((file) => cloudUpload(file.path));
        const imgUrlArray = await Promise.all(imagexPromiseArray);

        const images = imgUrlArray.map((imgUrl) => ({ url: imgUrl }));

        const uid = req.user.id;
        const accommodation = await roomService.findAccommodationById(uid);
        const hid = accommodation.id;
        const id = uuidv4().replace(/-/g, '');

        const roomData = {
            id,
            name,
            quantity,
            type,
            price,
            hostId: hid
        };

        // Create the room
        const data = await roomService.createRoom(roomData);
        const rid = data.id;

        // Upload room photos
        await roomService.uploadPhotosRoom({ images, rid });

        if (supportPetName) {
            await roomService.createSupportPet({
                name: supportPetName,
                description: supportPetDescription || '', 
                roomId: rid 
            });
        }

        res.status(201).json({
            status: 'success',
            message: 'Room created successfully',
        });
    } catch (err) {
        next(err);
    }
};

exports.listRooms = async (req, res, next) => {
    try {
        const { hostId } = req.params;
        const data = await roomService.listRoomsWithImages(hostId);

        res.status(200).json({
            status: 'success',
            data: data,
        });
    } catch (err) {
        next(err);
    }
};


exports.updateRoom = async (req, res, next) => {
    try {
        const { id } = req.params;
        const {
            name,
            quantity,
            type,
            price
        } = req.body;

        const room = await roomService.findRoomById(id);

        if (!room) {
            return next(createError(404, "Room not found"));
        }

        const updatedData = {
            name: name !== undefined ? name : room.name,
            quantity: quantity !== undefined ? quantity : room.quantity,
            type: type !== undefined ? type : room.type,
            price: price !== undefined ? price : room.price
        };

        await roomService.updateRoom(id, updatedData);

        const updatedRoom = await roomService.findRoomById(id);

        res.status(200).json({
            message: "Room updated successfully",
            room: updatedRoom
        });
    } catch (err) {
        next(err);
    }
};

exports.deleteRoom = async (req, res, next) => {
    try {
        const { id } = req.params;
        const room = await roomService.findRoomById(id);

        if (!room) {
            return next(createError(404, "Room not found"));
        }

        await roomService.deleteRoomById(id);
        res.status(200).json({
            message: "Room deleted successfully"
        });
    } catch (err) {
        next(err);
    }
};
