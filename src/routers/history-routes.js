const express = require('express');
const router = express.Router();
const historyController = require('../controllers/history-controller');
const authenticate = require('../middlewares/authenticate'); 

// กำหนดเส้นทาง (route) สำหรับการดึงข้อมูล BookingRequest ประวัติการจอง
router.get('/:bookingId', authenticate, historyController.getHistoryDetails);

module.exports = router;
