const router = require('express').Router();
const { validateEditUserInfo } = require('../middlewares/validate');
const usersController = require('../controllers/users');

// router.get('/', usersController.getUser);
router.get('/me', usersController.getUserInfo);
router.patch('/me', validateEditUserInfo, usersController.updateProfile);

module.exports = router;
