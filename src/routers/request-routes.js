const express = require('express');
const router = express.Router();
const requestController = require('../controllers/request-controller');

router.get('/list/:uid',requestController.listRequestDetails);
router.get('/list/owner/:uid',requestController.listRequestForOwner);


router.get('/list/detail/:reqId',requestController.getBookingRequestsDetailsById);

// router.get('/list/detail/owner/:reqId',requestController.listRequestForOwner);

router.put('/update-status/:reqId', requestController.updateBookingRequestStatus);

module.exports = router;
