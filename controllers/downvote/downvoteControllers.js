const Downvote = require("../../models/Downvote");
const Post = require("../../models/Post");
const User = require("../../models/User");
const appError = require("../../utils/appError");

const addDownvote = async (req, res, next) => {
  try {
    // Find id
    const { post_id } = req.params;
    const user_id = req.user;

    // Find user from user id
    const user = await User.findById(user_id);
    if (!user) {
      return next(appError("Invalid User. Please Log in", 401));
    }

    // Find post from post id
    const post = await Post.findById(post_id);
    if (!post) {
      return next(appError("Post is not availble", 404));
    }

    const downvote = await Downvote.create({
      author: user._id,
      post: post._id,
    });

    // Add ref to user model
    user.downvotes.push(downvote._id);
    user.save();

    // Add ref to post model
    post.downvotes.push(downvote._id);
    post.save();

    res.json({
      status: "success",
      msg: "Downvote added successfully",
      data: downvote,
    });
  } catch (error) {
    next(appError(error.message));
  }
};

const removeDownvote = async (req, res, next) => {
  try {
    const { up_id } = req.params;
    const user_id = req.user;

    const downvote = await Downvote.findById(up_id);
    if (!downvote) {
      return next(appError("Downvote is not available", 404));
    }

    if (user_id.toString() !== downvote.author.toString()) {
      return next(appError("You are not allowed to remove the downvote", 403));
    }

    const post = await Post.findById(downvote.post);

    post.downvotes = post.downvotes.filter(
      (uip) => uip.toString() !== downvote._id.toString()
    );
    post.save();

    await Downvote.findByIdAndDelete(up_id);

    res.json({
      status: "success",
      msg: "Downvote removed successfully",
    });
  } catch (error) {
    next(appError(error.message));
  }
};

const getAllPostDownvote = async (req, res, next) => {
  try {
    const { post_id } = req.params;
    const post = await Post.findById(post_id).populate("downvotes");
    if (!post) {
      return next(appError("Post is not available", 404));
    }

    const downvotes = post.downvotes;

    res.json({
      status: "success",
      msg: `Post has ${downvotes.length} downvotes`,
      data: downvotes,
    });
  } catch (error) {
    next(appError(error.message));
  }
};

const getAllUserDownvote = async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const user = await User.findById(user_id).populate("downvotes");
    if (!user) {
      return next(appError("User not found", 404));
    }

    const downvotes = user.downvotes;

    res.json({
      status: "success",
      msg: `User has ${downvotes.length} downvotes`,
      data: downvotes,
    });
  } catch (error) {
    next(appError(error.message));
  }
};

module.exports = {
  addDownvote,
  removeDownvote,
  getAllPostDownvote,
  getAllUserDownvote,
};
