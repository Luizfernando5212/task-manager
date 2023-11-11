const router = require('express').Router();
const userController = require('../controller/userController');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.get('/:id', userController.getUserById);
router.post('/login', userController.login);
router.get('/', userController.getUsers);
router.get('/oauth', userController.oauth);
router.get('/:id/channels', userController.getChannelsByUserId);
// router.get('/:id/channels', userController.getChannelsByUserId);
router.post('/', userController.insertUser);
router.post('/recoveryEmail', userController.recoveryEmail);
router.put('/:id', userController.updateUser);
router.put('/:id/recovery', userController.recoveryPassword);
router.delete('/:id', userController.deleteUser);

module.exports = router;
