const express = require('express');
const router = express.Router();

const layoutController = require('../controllers/layoutController');

router.get('/layouts', layoutController.getLayouts);
router.post('/layouts/:layoutId', layoutController.createLayout);
router.put('/layouts/:layoutId', layoutController.updateLayout);
router.delete('/layouts/:layoutId', layoutController.deleteLayout);

module.exports = router;






























///////////////---------------------------------------////////////////////
// const express = require('express');
// const router = express.Router();

// const layoutController = require('../controllers/layoutController');

// router.get('/:layout_id', layoutController.getLayoutById);
// router.post('/create', layoutController.createLayout);

// module.exports = router;



