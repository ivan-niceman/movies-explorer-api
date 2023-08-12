const router = require('express').Router();
const { getMe, updateUser } = require('../controllers/users');
const { updateUserValid } = require('../middlewares/validate');

router.get('/users/me', getMe);
router.patch('/users/me', updateUserValid, updateUser);

module.exports = router;
