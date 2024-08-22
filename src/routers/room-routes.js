const express = require('express');
const router = express.Router();
const roomController = require('../controllers/room-controller');
const authenticate = require('../middlewares/authenticate');
const upload = require('../middlewares/upload');

router.post('/create', authenticate,upload.array('images', 10), roomController.createRoom);
router.get("/list/:hostId", authenticate, roomController.listRooms);
router.put('/update/:id', authenticate, roomController.updateRoom);
router.delete('/delete/:id', authenticate, roomController.deleteRoom);

module.exports = router;
