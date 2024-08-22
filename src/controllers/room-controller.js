const createError = require("../utils/createError");
const roomService = require("../service/roomService");
const { v4: uuidv4 } = require("uuid");

exports.createRoom = async (req, res, next) => {
    try {
        const {
            name,
            type,
            price,
            hostId
        } = req.body;

        if (!name || !type || !price || !hostId) {
            return next(createError(400, 'Name, type, price, and host ID are required.'));
        }

        const id = uuidv4().replace(/-/g, '');
        const roomData = {
            id,
            name,
            type,
            price,
            hostId
        };

        await roomService.createRoom(roomData);
        res.status(201).json({
            status: 'success',
        });
    } catch (err) {
        next(err);
    }
};

exports.listRooms = async (req, res, next) => {
    try {
        const { hostId } = req.params;
        const data = await roomService.listRooms(hostId);

        const roomsData = data.map(room => room.get({ plain: true }));

        res.status(200).json({
            status: 'success',
            data: roomsData,
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
            type,
            price
        } = req.body;

        const room = await roomService.findRoomById(id);

        if (!room) {
            return next(createError(404, "Room not found"));
        }

        const updatedData = {
            name: name !== undefined ? name : room.name,
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
        await roomService.deleteRoomById(id);
        res.status(200).json({
            message: "Room deleted successfully"
        });
    } catch (err) {
        next(err);
    }
};
