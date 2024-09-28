const express = require('express');
const router = express.Router();
const roomController = require('../controllers/room-controller');
const upload = require('../middlewares/upload');

router.post('/create/:hid',upload.array('images', 10), roomController.createRoom);
router.get("/list/:hid", roomController.listRooms);
router.put('/update/:rid', upload.array('images', 10), roomController.updateRoom);
router.delete('/delete/:rid', roomController.deleteRoom);

module.exports = router;
