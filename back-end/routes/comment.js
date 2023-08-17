const router = require('express').Router();
const commentsController = require('../controller/commentsController');

router.get('/:taskId', commentsController.getCommentsByTask);
router.post('/', commentsController.insertComment);
router.put('/:id', commentsController.updateComment);
router.delete('/:id', commentsController.deleteComment);

module.exports = router;