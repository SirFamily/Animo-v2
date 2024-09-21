const express = require("express");
const router = express.Router();
const verifyHostController = require("../controllers/verifyhost-controller");
const authenticateAdmin = require("../middlewares/authenticateAdmin");

router.put("/:id", authenticateAdmin, verifyHostController.updateVerification);
router.get("/list/pending", authenticateAdmin, verifyHostController.listPending);
router.get("/list/approved", authenticateAdmin, verifyHostController.listApproved); 
router.get("/list/rejected", authenticateAdmin, verifyHostController.listRejected);  
router.get("/detail/:id", authenticateAdmin, verifyHostController.detail);

module.exports = router;
