const multer = require("multer");
const express = require("express");
const isLogin = require("../middlewares/isLogin");
const {
  createPost,
  updatePost,
  deletePost,
  getSinglePost,
  getAllPost,
} = require("../controllers/post/postControllers");
const { postBannerStorage } = require("../configs/cloudinary");

const postRoutes = express.Router();

// Storage
const bannerUploader = multer({ storage: postBannerStorage });

// Login middleware
postRoutes.use(isLogin);

// Create post
postRoutes.post("/", bannerUploader.single("banner"), createPost);

// Update post
postRoutes.put("/:id", bannerUploader.single("banner"), updatePost);

// Delete post
postRoutes.delete("/:id", deletePost);

// Get a single post
postRoutes.get("/:id", getSinglePost);

// Get all post of a user
postRoutes.get("/user/:user_id", getAllPost);

module.exports = postRoutes;
