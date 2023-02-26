const User = require("../models/User");
const bcrypt = require("bcrypt");
const errorHandler = require("../utils/errorHandler");

module.exports.createUser = async (req, res, next) => {
  const { username, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    const createdUser = await user.save();
    return res.status(200).json({
      createdUser,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    return res.status(200).json({ user });
  } catch (err) {
    const error = new Error("Bad Request");
    error.status = 400;
    next(error);
  }
};

module.exports.updateUser = async (req, res, next) => {
  const id = req.params.id;

  if (req.user._id === id) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { $set: req.body },
        { new: true }
      ).select("-password");
      res
        .status(200)
        .json({ message: "Successfully updated user", updatedUser });
    } catch (err) {
      let error = errorHandler("Bad Request", 400);
      next(error);
    }
  } else {
    let error = errorHandler("You are not authorized", 401);
    next(error);
  }
};

module.exports.deleteUser = async (req, res, next) => {
  const id = req.params.id;
  if (req.user._id === id) {
    const deletedUser = await User.findByIdAndDelete(id).select("-password");
    res
      .status(200)
      .clearCookie("user")
      .json({ message: "User successfully deleted", deletedUser });
  } else {
    let error = errorHandler("You are not authorized", 401);
    next(error);
  }
};
