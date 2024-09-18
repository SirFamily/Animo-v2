const express = require('express');
const router = express.Router();
const historyController = require('../controllers/history-controller');
const authenticate = require('../middlewares/authenticate'); 

router.get('/list/history', authenticate, historyController.listHistory);
router.get('/detail/history/:reqId', authenticate, historyController.getHistoryRequestsDetailsById);

module.exports = router;
