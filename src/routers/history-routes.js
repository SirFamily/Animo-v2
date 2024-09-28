const express = require('express');
const router = express.Router();
const historyController = require('../controllers/history-controller');

router.get('/list/history/:uid', historyController.listHistory);
router.get('/detail/history/:reqId', historyController.getHistoryRequestsDetailsById);

module.exports = router;
