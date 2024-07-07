const Comment = require("../../models/Comment");
const Post = require("../../models/Post");
const User = require("../../models/User");
const appError = require("../../utils/appError");

const addNewComment = async (req, res, next) => {
  try {
    const { message } = req.body;
    const { post_id } = req.params;

    const user = await User.findById(req.user);
    if (!user) {
      return next(appError("Invalid user. Please log in", 401));
    }

    const post = await Post.findById(post_id);
    if (!post) {
      return next(appError("Post is not available", 403));
    }

    const comment = await Comment.create({
      message,
      author: user._id,
    });

    user.comments.push(comment._id);
    await user.save();
    post.comments.push(comment._id);
    await post.save();

    res.json({
      status: "success",
      msg: "New comment added successfully",
      data: comment,
    });
  } catch (error) {
    next(appError(error.message));
  }
};

const updateComment = (req, res, next) => {
  try {
    res.json({
      status: "success",
      msg: "Comment updated successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteComment = (req, res, next) => {
  try {
    res.json({
      status: "success",
      msg: "Comment deleted successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllComments = (req, res, next) => {
  try {
    res.json({
      status: "success",
      msg: "All comments listed",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  addNewComment,
  updateComment,
  deleteComment,
  getAllComments,
};
