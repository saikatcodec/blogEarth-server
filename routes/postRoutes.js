const express = require("express");
const isLogin = require("../middlewares/isLogin");
const {
  createPost,
  updatePost,
  deletePost,
  getSinglePost,
  getAllPost,
} = require("../controllers/post/postControllers");

const postRoutes = express.Router();

// Login middleware
postRoutes.use(isLogin);

// Create post
postRoutes.post("/", createPost);

// Update post
postRoutes.put("/:id", updatePost);

// Delete post
postRoutes.delete("/:id", deletePost);

// Get a single post
postRoutes.get("/:id", getSinglePost);

// Get all post of a user
postRoutes.get("/user/:user_id", getAllPost);

module.exports = postRoutes;
