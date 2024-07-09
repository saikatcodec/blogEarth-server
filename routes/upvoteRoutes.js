const express = require("express");
const isLogin = require("../middlewares/isLogin");
const {
  addUpvote,
  removeUpvote,
  getAllPostUpvote,
  getAllUserUpvote,
} = require("../controllers/upvote/upvoteControllers");

const upvoteRoutes = express.Router();

// Login middleware
upvoteRoutes.use(isLogin);

// Add upvote
upvoteRoutes.post("/:post_id", addUpvote);

// Remove upvote
upvoteRoutes.delete("/:up_id", removeUpvote);

// gell all upvotes of a post
upvoteRoutes.get("/post/:post_id", getAllPostUpvote);

// gell all upvotes of a user
upvoteRoutes.get("/user/:user_id", getAllUserUpvote);

module.exports = upvoteRoutes;
