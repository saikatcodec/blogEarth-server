const express = require("express");
const isLogin = require("../middlewares/isLogin");
const {
  addDownvote,
  removeDownvote,
  getAllPostDownvote,
  getAllUserDownvote,
} = require("../controllers/downvote/downvoteControllers");

const downvoteRoutes = express.Router();

// Login middleware
downvoteRoutes.use(isLogin);

// Add upvote
downvoteRoutes.post("/:post_id", addDownvote);

// Remove upvote
downvoteRoutes.delete("/:up_id", removeDownvote);

// gell all upvotes of a post
downvoteRoutes.get("/post/:post_id", getAllPostDownvote);

// gell all upvotes of a user
downvoteRoutes.get("/user/:user_id", getAllUserDownvote);

module.exports = downvoteRoutes;
