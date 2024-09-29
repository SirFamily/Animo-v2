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
            supportPetName,  
            supportPetDescription 
        } = req.body;
        const { hid } = req.params;

        if (!name || !quantity || !type || !price) {
            return res.status(400).json({ message: 'Name, quantity, type, and price are required.' });
        }

        const imagexPromiseArray = req.files.map((file) => cloudUpload(file.path));
        const imgUrlArray = await Promise.all(imagexPromiseArray);

        const images = imgUrlArray.map((imgUrl) => ({ url: imgUrl }));

        const id = uuidv4().replace(/-/g, '');

        const roomData = {
            id,
            name,
            quantity,
            type,
            price,
            hostId: hid
        };

        const data = await roomService.createRoom(roomData);
        const rid = data.id;
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
        const { hid } = req.params;
        const data = await roomService.listRoomsWithImages(hid);

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
        const { rid } = req.params;
        const {
            name,
            quantity,
            type,
            price
        } = req.body;

        const room = await roomService.findRoomById(rid);

        if (!room) {
            return res.status(404).json({ message: "Room not found" });
        }

        const updatedData = {
            name: name !== undefined ? name : room.name,
            quantity: quantity !== undefined ? quantity : room.quantity,
            type: type !== undefined ? type : room.type,
            price: price !== undefined ? price : room.price
        };

        await roomService.updateRoom(rid, updatedData);

        const updatedRoom = await roomService.findRoomById(rid);

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
        const { rid } = req.params;
        const room = await roomService.findRoomById(rid);

        if (!room) {
            return res.status(404).json({ message: "Room not found" });
        }

        await roomService.deleteRoomById(rid);
        res.status(200).json({
            message: "Room deleted successfully"
        });
    } catch (err) {
        next(err);
    }
};
