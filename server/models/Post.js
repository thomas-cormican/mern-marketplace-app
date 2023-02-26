const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    images: {
      type: Array,
    },
    contact: {
      email: {
        type: String,
      },
      phone: {
        type: String,
      },
    },
    category: {
      type: String,
      enum: [
        "cars",
        "electronics",
        "baby & kids",
        "music & education",
        "house & diy",
        "clothes & lifestyle",
        "business",
        "property",
        "animals",
        "cars & motor",
        "holiday & tickets",
        "services",
        "sports & hobbies",
        "farming",
        "lost & found",
        "everything",
      ],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
