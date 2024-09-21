const express = require("express");
const router = express.Router();
const verifyHostController = require("../controllers/verifyhost-controller");
const authenticateAdmin = require("../middlewares/authenticateAdmin");

// Route to update the verification status of a host
router.put("/:id", authenticateAdmin, verifyHostController.updateVerification);
router.get("/list", authenticateAdmin, verifyHostController.list);
router.get("/detail/:id", authenticateAdmin, verifyHostController.detail);

module.exports = router;
