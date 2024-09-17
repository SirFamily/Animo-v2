const express = require('express');
const router = express.Router();
const requestController = require('../controllers/request-controller');
const authenticate = require('../middlewares/authenticate'); 

router.get('/list',authenticate,requestController.listRequestDetails);
router.get('/list/owner',authenticate,requestController.listRequestForOwner);


router.get('/list/:reqId',authenticate,requestController.getBookingRequestsDetailsById);

router.get('/list/owner/:reqId',authenticate,requestController.listRequestForOwner);

router.put('/update-status/:reqId', authenticate, requestController.updateBookingRequestStatus);

module.exports = router;
