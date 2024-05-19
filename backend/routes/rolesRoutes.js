const express = require('express');
const router = express.Router();
const rolesController = require('../controllers/rolesController')

router.get('/index', rolesController.index);
router.post('/update', rolesController.updateRole);
router.post('/delete', rolesController.deleteRole);
router.post('/create', rolesController.createRole);

module.exports = router;
