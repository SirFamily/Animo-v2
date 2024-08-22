const express = require('express');
const router = express.Router();
const accommodationController = require('../controllers/accommodation-controller');
const authenticate = require('../middlewares/authenticate');

router.post('/create/:uid', authenticate, accommodationController.createAccommodation);
router.get("/list/:uid", authenticate, accommodationController.listAccommodations);
router.put('/update/:id', authenticate, accommodationController.updateAccommodation);
router.delete('/delete/:id', authenticate, accommodationController.deleteAccommodation);

module.exports = router;
