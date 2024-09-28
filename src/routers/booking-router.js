const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/booking-controller")
// const upload = require("../middlewares/upload");

router.post("/create", bookingController.createBooking);


module.exports = router;
