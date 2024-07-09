const Post = require("../../models/Post");
const Upvote = require("../../models/Upvote");
const User = require("../../models/User");
const appError = require("../../utils/appError");

const addUpvote = async (req, res, next) => {
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

    const upvote = await Upvote.create({
      author: user._id,
      post: post._id,
    });

    // Add ref to user model
    user.upvotes.push(upvote._id);
    user.save();

    // Add ref to post model
    post.upvotes.push(upvote._id);
    post.save();

    res.json({
      status: "success",
      msg: "Upvote added successfully",
      data: upvote,
    });
  } catch (error) {
    next(appError(error.message));
  }
};

const removeUpvote = (req, res, next) => {
  try {
    res.json({
      status: "success",
      msg: "Upvote removed successfully",
    });
  } catch (error) {
    next(appError(error.message));
  }
};

const getAllPostUpvote = (req, res, next) => {
  try {
    res.json({
      status: "success",
      msg: "All Post upvotes are...",
    });
  } catch (error) {
    next(appError(error.message));
  }
};

const getAllUserUpvote = (req, res, next) => {
  try {
    res.json({
      status: "success",
      msg: "All user upvotes are...",
    });
  } catch (error) {
    next(appError(error.message));
  }
};

module.exports = {
  addUpvote,
  removeUpvote,
  getAllPostUpvote,
  getAllUserUpvote,
};
