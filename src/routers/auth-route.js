const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth-controller");
const authenticate = require("../middlewares/authenticate");
const upload = require("../middlewares/upload");

router.post("/register", upload.single("img"), authController.register);
router.post("/login", authController.login);
router.get("/getme", authenticate, authController.me);
router.put("/update", authenticate, upload.single("img"), authController.updateUser);

module.exports = router;
