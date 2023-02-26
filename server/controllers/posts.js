const Post = require("../models/Post");
const errorHandler = require("../utils/errorHandler");
const fs = require("fs");

module.exports.getPosts = async (req, res, next) => {
  const { lte, gte, category, sort, user } = req.query;

  let filters = {};
  if (lte && !gte) {
    filters.price = { $lte: lte };
  }
  if (gte && !lte) {
    filters.price = { $gte: gte };
  }
  if (gte && lte) {
    filters.price = { $gte: gte, $lte: lte };
  }
  if (category) {
    filters.category = category;
  }
  if (user) {
    filters.author = { _id: user };
  }

  try {
    let posts;

    if (req.query.title) {
      posts = await Post.find({
        title: { $regex: req.query.title, $options: "i" },
      })
        .limit(10)
        .skip(10 * (req.query.page - 1))
        .sort(sort || "-createdAt")
        .populate("author");
    } else {
      posts = await Post.find(filters)
        .limit(10)
        .skip(10 * (req.query.page - 1))
        .sort(sort || "-createdAt")
        .populate("author");
    }

    res.status(200).json({ posts });
  } catch (err) {
    let error = errorHandler("Bad Request", 400);
    next(error);
  }
};

module.exports.getPostById = async (req, res, next) => {
  const id = req.params.id;

  try {
    const post = await Post.findById(id).populate("author");
    res.status(200).json({ post });
  } catch (err) {
    let error = errorHandler("Bad Request", 400);
    next(error);
  }
};

module.exports.createPost = async (req, res, next) => {
  let fileNames = [];
  req.files.forEach((file) => fileNames.push(file.filename));
  try {
    const createdPost = new Post({
      ...req.body,
      contact: {
        email: req.body.email,
        phone: req.body.phone,
      },
      author: req.user._id,
      images: fileNames,
    });
    await createdPost.save();
    res.status(200).json({ createdPost });
  } catch (err) {
    fileNames.forEach((fileName) => {
      fs.unlink(`server/public/postImages/${fileName}`, function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("File successfully deleted");
        }
      });
    });
    let error = errorHandler("Bad Request", 400);
    next(error);
  }
};

module.exports.deletePost = async (req, res, next) => {
  const id = req.params.id;
  try {
    let post = await Post.findById(id);
    if (req.user._id == post.author) {
      await Post.findByIdAndDelete(id);
      post.images.forEach((image) => {
        fs.unlink(`server/public/postImages/${image}`, (err) => {
          if (err) {
            console.log(err);
          }
        });
      });
      res.status(200).json({ deletedPost: post });
    } else {
      let error = errorHandler("You are not authorized", 401);
      next(error);
    }
  } catch (err) {
    let error = errorHandler("Bad Request", 400);
    next(error);
  }
};
