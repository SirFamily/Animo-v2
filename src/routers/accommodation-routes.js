const express = require('express');
const router = express.Router();
const accommodationController = require('../controllers/accommodation-controller');
const upload = require('../middlewares/upload');

router.post('/create/:uid',upload.array('images', 10), accommodationController.createAccommodation);
router.get("/list/:uid", accommodationController.listAccommodations);
router.put('/update/:hid', upload.array('images', 10), accommodationController.updateAccommodation);
router.delete('/delete/:hid', accommodationController.deleteAccommodation);

module.exports = router;
