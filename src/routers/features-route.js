const express = require('express');
const router = express.Router();
const featuresController = require('../controllers/features-controller');

router.post('/create/:hid', featuresController.createFeature);
router.get('/list/:hid', featuresController.getFeature);
router.put('/update/:fid', featuresController.updateFeature);
router.delete('/delete/:fid', featuresController.deleteFeature);

module.exports = router;
