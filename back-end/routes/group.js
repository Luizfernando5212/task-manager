const router = require('express').Router();
const groupController = require('../controller/groupController');

router.get('/', groupController.getGroups);
router.get('/:id', groupController.getGroupById);
router.post('/', groupController.insertGroup);
router.put('/:id', groupController.updateGroup);
router.delete('/:id', groupController.deleteGroup);

module.exports = router;