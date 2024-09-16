const express = require('express');
const router = express.Router();
const requestController = require('../controllers/request-controller');
const authenticate = require('../middlewares/authenticate'); 

// กำหนดเส้นทาง (route) สำหรับการดึงข้อมูล BookingRequest และข้อมูลที่เกี่ยวข้อง
router.get('/list',authenticate,requestController.listRequestDetails);
router.get('/list/:reqId',authenticate,requestController.getBookingRequestsDetailsById);


module.exports = router;
