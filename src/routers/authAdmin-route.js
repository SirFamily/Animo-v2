const express = require("express");
const router = express.Router();
const authAdminController = require("../controllers/authAdmin-controller");
const authenticate = require("../middlewares/authenticate");
const upload = require("../middlewares/upload");

router.post("/register", upload.single("img"), authAdminController.register);
router.post("/login", authAdminController.login);

module.exports = router;
