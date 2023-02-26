const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const errorHandler = require("../utils/errorHandler");

module.exports.login = async (req, res, next) => {
  const { usernameOrEmail, password } = req.body;
  let user;

  try {
    user = await User.findOne({
      $or: [
        { username: { $regex: `^${usernameOrEmail}$`, $options: "i" } },
        { email: { $regex: `^${usernameOrEmail}$`, $options: "i" } },
      ],
    });
    user.toObject();
    let match = await bcrypt.compare(password, user.password);
    if (match) {
      user.password = undefined;
      let token = jwt.sign({ user: user }, process.env.AUTH_SECRET, {
        expiresIn: 60 * 60,
      });
      return res.status(200).cookie("user", token).json({ user });
    } else {
      let error = errorHandler("Incorrect Credentials", 401);
      return next(error);
    }
  } catch (err) {
    const error = new Error("Bad Request");
    error.status = 400;
    return next(error);
  }
};

module.exports.verify = async (req, res) => {
  //if the request makes it past the checkAuth middleware the token is valid
  try {
    const user = await User.findById(req.user._id);
    res.status(200).json({ user });
  } catch (err) {}
};

module.exports.logout = (req, res) => {
  if (req.user) {
    return res
      .status(200)
      .clearCookie("user")
      .json({ message: "Successfully logged out" });
  } else {
    return res.status(400).json({ message: "You are not currently logged in" });
  }
};
