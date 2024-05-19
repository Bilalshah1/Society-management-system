/////////////////3rd try/////////////
const express = require('express');
const router = express.Router();
const tableController = require('../controllers/tableController');

router.get('/index', tableController.index)
router.get('/data', tableController.getData);
router.post('/data/update', tableController.updateData);

router.post('/config/update', tableController.configUpdate); 

router.post('/tuple/add', tableController.addTuplePost);
router.post('/tuple/delete', tableController.deleteTuple);

router.post('/update', tableController.updateTable);
router.post('/delete', tableController.deleteTable);

router.post('/data/delete', tableController.deleteData);

module.exports = router;

