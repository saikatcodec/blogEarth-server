const Post = require("../../models/Post");
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
      return next(appError("You are not allowed to edit the post", 403));
    }

    await Post.findByIdAndDelete(post_id);

    res.json({
      status: "success",
      msg: "Post deleted successfully",
    });
  } catch (error) {
    next(appError(error.message));
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

const getAllPost = (req, res, next) => {
  try {
    res.json({
      status: "success",
      msg: "All Post",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createPost,
  updatePost,
  deletePost,
  getSinglePost,
  getAllPost,
};
