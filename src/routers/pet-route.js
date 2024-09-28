const express = require('express');
const router = express.Router();
const petController = require('../controllers/pet-controller');
const upload = require('../middlewares/upload');

router.post('/create/:uid', upload.single('url'), petController.addPet);
router.get("/list/:uid",petController.listpet)
router.put('/update/:pid',upload.single('url'), petController.updatePet);
router.delete('/delete/:pid', petController.deletePet);
router.get("/find/:uid",petController.listPetByIdUser)

module.exports = router;
