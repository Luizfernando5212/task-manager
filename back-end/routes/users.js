const router = require('express').Router();
const userController = require('../controller/userController');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.get('/:id', userController.getUserById);
router.get('/', userController.getUsers);
router.get('/channels/:id', userController.getChannelsByUserId);
router.post('/', userController.insertUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
