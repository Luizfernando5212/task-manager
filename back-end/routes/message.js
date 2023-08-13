const router = require('express').router();
const messageController = require('../controller/messageController');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// Individual messages
router.get('/:userId', messageController.messagesByUserId(req, res));
router.get('/:receiver/:sender')
router.post('/', messageController.postMessage(req, res));
router.put('/:userId', messageController.updateMessage(req, res));

// Group messages
router.get('/group/:id', groupMessageController.groupMessageById(req, res));
router.post('/group', goupMessageController.postGroupMessage(req, res));


module.exports = router;
