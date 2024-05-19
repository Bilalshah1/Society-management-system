const express = require('express');
const router = express.Router();

const membersController = require('../controllers/membersController');
///?????????
// router.get('/roles/index', membersController.getRolesIndex);
// router.get('/roles/:role_id', membersController.getMembersByRole);

router.post('/add', membersController.addMember);
router.post('/delete', membersController.deleteMember);  //mayeb use route.delete
router.get('/getMembers',membersController.getMembers);

module.exports = router;
