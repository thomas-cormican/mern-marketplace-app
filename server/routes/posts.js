const router = require("express").Router();
const checkAuth = require("../middleware/checkAuth");
const multer = require("multer");
const path = require("path");
const uuidv4 = require("uuid").v4;
const {
  getPosts,
  getPostById,
  createPost,
  deletePost,
} = require("../controllers/posts");

function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error("Only images are allowed"));
  }
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "server/public/postImages");
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];

    cb(null, uuidv4() + "." + ext);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
  limits: {
    fileSize: 10485760,
  },
});

router.get("/", getPosts);

router.get("/:id", getPostById);

router.post("/", checkAuth, upload.array("photo"), createPost);

router.delete("/:id", checkAuth, deletePost);

module.exports = router;
