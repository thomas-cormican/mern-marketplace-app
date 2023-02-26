const jwt = require("jsonwebtoken");
const errorHandler = require("../utils/errorHandler");

module.exports = (req, res, next) => {
  try {
    let decoded = jwt.verify(req.cookies.user, process.env.AUTH_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    let error = errorHandler("You are not authorized", 401);
    next(error);
  }
};
