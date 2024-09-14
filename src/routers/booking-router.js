const express = require("express");
const router = express.Router();
const authenticate = require("../middlewares/authenticate");
const bookingController = require("../controllers/booking-controller")
const upload = require("../middlewares/upload");

router.post("/create", authenticate, bookingController.createBooking);


module.exports = router;
