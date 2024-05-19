const express = require('express');
const router = express.Router();
const viewsController = require('../controllers/viewsController')

router.get('/:view_id', viewsController.getLayoutsByView);
router.get('/:view_id', viewsController.getLayoutsByView);
router.get('/:view_id', viewsController.getLayoutsByView);


module.exports = router;
