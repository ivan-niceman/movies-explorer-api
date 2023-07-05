const router = require('express').Router();
const { validateUserBody } = require('../middlewares/validate');
const usersController = require('../controllers/users');

router.get('/me', usersController.getUserInfo);
router.patch('/me', validateUserBody, usersController.updateProfile);

module.exports = router;
