const express = require('express');
const router = express.Router();
const featuresController = require('../controllers/features-controller');
const authenticate = require('../middlewares/authenticate'); 

router.post('/create', authenticate, featuresController.createFeature);
router.get('/list', authenticate, featuresController.getFeature);
router.put('/update/:fid', authenticate, featuresController.updateFeature);
router.delete('/delete/:fid', authenticate, featuresController.deleteFeature);

module.exports = router;
