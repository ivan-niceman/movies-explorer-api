const router = require("express").Router();
const { getMe, updateUser } = require("../controllers/user");
const { updateUserValid } = require("../middlewares/validation");

router.get("/users/me", getMe);
router.patch("/users/me", updateUserValid, updateUser);

module.exports = router;
