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

const removeUpvote = async (req, res, next) => {
  try {
    const { up_id } = req.params;
    const user_id = req.user;

    const upvote = await Upvote.findById(up_id);
    if (!upvote) {
      return next(appError("Upvote is not available", 404));
    }

    if (user_id.toString() !== upvote.author.toString()) {
      return next(appError("You are not allowed to remove the upvote", 403));
    }

    const post = await Post.findById(upvote.post);

    post.upvotes = post.upvotes.filter(
      (uip) => uip.toString() !== upvote._id.toString()
    );
    post.save();

    await Upvote.findByIdAndDelete(up_id);

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
