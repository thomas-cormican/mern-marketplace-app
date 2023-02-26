require("dotenv").config();
const express = require("express");
const usersRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postsRoute = require("./routes/posts");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const errorHandler = require("./utils/errorHandler");
const path = require("path");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGODB_URI);
}

const port = process.env.PORT || 8000;

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("server/public"));
app.use(express.static(path.resolve(__dirname, "../client/build")));

app.use("/auth", authRoute);
app.use("/users", usersRoute);
app.use("/posts", postsRoute);

app.use("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build/index.html"));
});

app.use((req, res, next) => {
  const error = errorHandler("Not found", 404);
  next(error);
});

app.use((error, req, res, next) => {
  if (typeof error.status === "undefined" || !error.status) {
    error.status = 505;
  }
  res.status(error.status).json({ error, message: error.message });
});

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
