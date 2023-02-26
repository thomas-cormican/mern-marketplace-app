const router = require("express").Router();
const checkAuth = require("../middleware/checkAuth");
const {
  createUser,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/users");

//create user
router.post("/", createUser);

//get user
router.get("/:id", getUser);

//update user
router.put("/:id", checkAuth, updateUser);

//delete user
router.delete("/:id", checkAuth, deleteUser);

module.exports = router;
