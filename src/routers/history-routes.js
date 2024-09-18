const express = require('express');
const router = express.Router();
const historyController = require('../controllers/history-controller');
const authenticate = require('../middlewares/authenticate'); 

router.get('/:bookingId', authenticate, historyController.getHistoryDetails);

module.exports = router;
