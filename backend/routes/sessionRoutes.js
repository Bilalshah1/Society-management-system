const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/sessionController');


router.get('/index', sessionController.index);
router.get('/sidebar', sessionController.sidebar);

router.get('/detail', sessionController.detail); 
router.post('/detail/update', sessionController.detailUpdate); 


router.post('/create', sessionController.sessionCreate);
router.post('/delete', sessionController.sessionDelete);

module.exports = router;
