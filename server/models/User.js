const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String },
    bio: { type: String },
    email: { type: String, immutable: true },
    password: { type: String },
    profilePicture: { type: String },
    admin: { type: Boolean, default: false, immutable: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
