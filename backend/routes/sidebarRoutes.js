const express = require('express');
const router = express.Router();
const sidebarController = require('../controllers/sidebarController')

router.get('/users/permission', sidebarController.getUserPermissions);
router.get('/views/index', sidebarController.getViewIndex);

module.exports = router;
