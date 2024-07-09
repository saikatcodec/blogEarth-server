const { deleteFile } = require("../../configs/cloudinary");
const Comment = require("../../models/Comment");
const Post = require("../../models/Post");
const Upvote = require("../../models/Upvote");
const User = require("../../models/User");
const appError = require("../../utils/appError");

const createPost = async (req, res, next) => {
  try {
    const { title, content, category, keyword } = req.body;

    // Find login user
    const user = await User.findById(req.user);
    if (!user) {
      return next(appError("User not found. Please log in", 401));
    }

    // Create a post
    const post = await Post.create({
      title,
      content,
      category,
      keyword,
      banner: {
        path: req.file?.path,
        file_id: req.file?.filename,
      },
      author: user._id,
    });

    // Add reference to the user
    user.posts.push(post._id);
    await user.save();

    res.json({
      status: "success",
      msg: "Post created successfully",
      data: post,
    });
  } catch (error) {
    next(appError(error.message));
  }
};

const updatePost = async (req, res, next) => {
  try {
    const post_id = req.params.id;
    const { title, content, category, keyword } = req.body;

    // check logged in user
    const user = await User.findById(req.user);
    if (!user) {
      return next(appError("User not found. Please log in", 401));
    }

    // find the post
    const post = await Post.findById(post_id);
    if (!post) {
      return next(appError("Post is not available", 404));
    }

    // check the post author
    if (user._id.toString() !== post.author._id.toString()) {
      return next(appError("You are not allowed to edit the post", 403));
    }

    // Delete existing file
    if (req.file) {
      await deleteFile(post.banner?.file_id);
    }

    const postUpdated = await Post.findByIdAndUpdate(
      post_id,
      {
        title,
        content,
        category,
        keyword,
        banner: {
          path: req.file?.path || post.banner.path,
          file_id: req.file?.filename || post.banner.file_id,
        },
      },
      {
        new: true,
      }
    );

    res.json({
      status: "success",
      msg: "Post updated successfully",
      data: postUpdated,
    });
  } catch (error) {
    next(appError(error.message));
  }
};

const deletePost = async (req, res, next) => {
  try {
    const post_id = req.params.id;

    // check logged in user
    const user = await User.findById(req.user);
    if (!user) {
      return next(appError("User not found. Please log in", 401));
    }

    // find the post
    const post = await Post.findById(post_id);
    if (!post) {
      return next(appError("Post is not available", 404));
    }

    // check the post author
    if (user._id.toString() !== post.author._id.toString()) {
      return next(appError("You are not allowed to delete the post", 403));
    }

    // also delete comments
    for (let i = 0; i < post.comments.length; i++) {
      await Comment.findByIdAndDelete(post.comments[i]);
    }

    // also delete upvotes
    for (let i = 0; i < post.upvotes.length; i++) {
      await Upvote.findByIdAndDelete(post.upvotes[i]);
    }

    // TODO: delete downvotes

    // also delete reference from the user
    const userUpdate = await User.findById(post.author);
    userUpdate.posts = userUpdate.posts.filter(
      (id) => id.toString() !== post._id.toString()
    );
    await userUpdate.save();

    await Post.findByIdAndDelete(post_id);

    res.json({
      status: "success",
      msg: "Post deleted successfully",
    });
  } catch (error) {
    next(appError(error));
  }
};

const getSinglePost = async (req, res, next) => {
  try {
    const post_id = req.params.id;

    const post = await Post.findById(post_id);

    if (!post) {
      return next(appError("Post is not available", 404));
    }

    res.json({
      status: "success",
      msg: "A single post",
      data: post,
    });
  } catch (error) {
    next(appError(error.message));
  }
};

const getAllPost = async (req, res, next) => {
  try {
    const user_id = req.params.user_id;
    const user = await User.findById(user_id).populate("posts");

    if (!user) {
      return next(appError("Invalid User", 404));
    }

    const posts = user.posts;

    res.json({
      status: "success",
      msg: `You have ${posts.length} posts`,
      data: posts,
    });
  } catch (error) {
    next(appError(error.message));
  }
};

module.exports = {
  createPost,
  updatePost,
  deletePost,
  getSinglePost,
  getAllPost,
};
