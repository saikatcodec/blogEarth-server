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
      return next(appError("Post is not available", 404));
    }

    const comment = await Comment.create({
      message,
      author: user._id,
      post: post._id,
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

const updateComment = async (req, res, next) => {
  try {
    const { message } = req.body;
    const { id } = req.params;

    const user = await User.findById(req.user);
    if (!user) {
      return next(appError("Invalid user. Please log in", 401));
    }

    const comment = await Comment.findById(id);
    if (!comment) {
      return next(appError("Comment is not available", 404));
    }

    if (comment.author.toString() !== user._id.toString()) {
      return next(appError("You are not allowed to edit the comment", 403));
    }

    const commentUpdate = await Comment.findByIdAndUpdate(
      id,
      {
        message,
      },
      { new: true }
    );

    res.json({
      status: "success",
      msg: "Comment updated successfully",
      data: commentUpdate,
    });
  } catch (error) {
    next(appError(error.message));
  }
};

const deleteComment = async (req, res, next) => {
  try {
    // Find all necessary id
    const user_id = req.user;
    const comment_id = req.params.id;

    // Find the user
    const user = await User.findById(user_id);
    if (!user) {
      return next(appError("Invalid User. Please log in", 401));
    }

    // Find the comment
    const comment = await Comment.findById(comment_id);
    if (!comment) {
      return next(appError("Comment is not Found", 404));
    }

    // Find the post
    const post = await Post.findById(comment.post);
    if (!post) {
      return next(appError("Post is not available", 404));
    }

    // Validity check
    if (user._id.toString() !== comment.author.toString()) {
      return next(appError("You are not allowed to delete the comment", 403));
    }

    // Delete reference from post
    post.comments = post.comments.filter(
      (cid) => cid.toString() !== comment._id.toString()
    );
    await post.save();

    // Detete comment
    await Comment.findByIdAndDelete(comment_id);

    res.json({
      status: "success",
      msg: "Comment deleted successfully",
    });
  } catch (error) {
    next(appError(error.message));
  }
};

const getAllComments = async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const user = await User.findById(user_id).populate("comments");
    if (!user) {
      return next(appError("user not found", 404));
    }

    const comments = user.comments;

    res.json({
      status: "success",
      msg: `User has ${comments.length} comments`,
      data: comments,
    });
  } catch (error) {
    next(appError(error.message));
  }
};

module.exports = {
  addNewComment,
  updateComment,
  deleteComment,
  getAllComments,
};
