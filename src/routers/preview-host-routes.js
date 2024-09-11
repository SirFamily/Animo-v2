const express = require('express');
const router = express.Router();
const hostController = require('../controllers/preview-host-controller');
const authenticate = require('../middlewares/authenticate'); 

router.get('/list', authenticate, hostController.listPublishedHost);
router.get('/list/:hid', authenticate, hostController.listHostByID);

module.exports = router;
