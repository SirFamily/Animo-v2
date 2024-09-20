const express = require("express");
const router = express.Router();
const authAdminController = require("../controllers/authAdmin-controller");
const authenticateAdmin = require("../middlewares/authenticateAdmin");
const upload = require("../middlewares/upload");

router.get("/getad",authenticateAdmin,authAdminController.getad);
router.post("/register", upload.single("img"), authAdminController.register);
router.post("/login",authAdminController.login);

module.exports = router;
