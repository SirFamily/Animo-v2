const express = require("express");
const router = express.Router();
const verifyHostController = require("../controllers/verifyhost-controller");

router.put("/:id/:adminId", verifyHostController.updateVerification);
router.get("/list/pending", verifyHostController.listPending);
router.get("/list/approved", verifyHostController.listApproved); 
router.get("/list/rejected", verifyHostController.listRejected);  
router.get("/detail/:id", verifyHostController.detail);

module.exports = router;
