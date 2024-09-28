const express = require('express');
const router = express.Router();
const hostController = require('../controllers/preview-host-controller');

router.get('/list/:uid', hostController.listPublishedHost);
router.get('/get/:hid', hostController.listHostByID);

module.exports = router;
