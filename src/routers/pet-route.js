const express = require('express');
const router = express.Router();
const petController = require('../controllers/pet-controller');
const authenticate = require('../middlewares/authenticate');
const upload = require('../middlewares/upload');

router.post('/create/:uid', authenticate, upload.single('url'), petController.newpet);
router.get("/list/:uid" ,authenticate,petController.listpet)
router.put('/update/:pid', authenticate,upload.single('url'), petController.updatePet);
router.delete('/delete/:pid', authenticate, petController.deletePet);

module.exports = router;
