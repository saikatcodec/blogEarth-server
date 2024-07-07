const express = require("express");
const {
  addNewComment,
  updateComment,
  deleteComment,
  getAllComments,
} = require("../controllers/comment/commentControllers");
const isLogin = require("../middlewares/isLogin");

const commentRoutes = express.Router();

// Login middleware
commentRoutes.use(isLogin);

// Create new comment
commentRoutes.post("/:post_id", addNewComment);

// Update comment
commentRoutes.put("/:id", updateComment);

// Delete comment
commentRoutes.delete("/:id", deleteComment);

// get all comment of a user
commentRoutes.get("/user/:user_id", getAllComments);

module.exports = commentRoutes;
