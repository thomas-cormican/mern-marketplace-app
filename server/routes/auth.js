const router = require("express").Router();
const checkAuth = require("../middleware/checkAuth");
const { login, verify, logout } = require("../controllers/auth");

//login
router.post("/login", login);

//auto-login
router.post("/verify", checkAuth, verify);

//logout
router.post("/logout", checkAuth, logout);

module.exports = router;
