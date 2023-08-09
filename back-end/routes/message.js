const router = require('express').router();
const messageController = require('../controller/messageController');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// Individual messages
router.get('/{userId}', messageController.messagesByUserId(req, res));
router.post('/', messageController.postMessage(req, res));
router.put('/')

// Group messages
router.get('/group/{id}', messageController.groupMessageById(req, res));
router.post('/group', messageController.postGroupMessage(req, res));


module.exports = router;
