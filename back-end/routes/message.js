const router = require('express').Router();
const messageController = require('../controller/messageController');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// Individual messages
router.get('/:userId', messageController.messagesByUserId);
router.get('/:sender/:receiver', messageController.messagesByReceiverSender)
router.get('/channels/:id', messageController.messagesByChannelId);
router.post('/', messageController.postMessage);
router.put('/:userId', messageController.updateMessage);
router.delete('/:id', messageController.deleteMessage);

// Group messages
// router.get('/group/:id', groupMessageController.groupMessageById);
// router.post('/group', goupMessageController.postGroupMessage);


module.exports = router;
