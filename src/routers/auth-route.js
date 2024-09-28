const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth-controller");
const upload = require("../middlewares/upload");

router.post("/register", upload.single("img"), authController.register);
router.post("/login", authController.login);
router.put("/update/:uid", upload.single("img"), authController.updateUser);

module.exports = router;
