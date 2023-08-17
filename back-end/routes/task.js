const router = require('express').Router();
const taskController = require('../controller/taskController');

router.get('/', taskController.getTasks);
router.get('/:id', taskController.getTaskById);
router.post('/', taskController.insertTask);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

module.exports = router;