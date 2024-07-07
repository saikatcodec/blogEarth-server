const Post = require("../../models/Post");
const User = require("../../models/User");
const appError = require("../../utils/appError");

const createPost = async (req, res, next) => {
  try {
    const { title, content, category, keyword } = req.body;

    // Find login user
    const user = await User.findById(req.user);
    if (!user) {
      return next(appError("User not found", 404));
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

const updatePost = (req, res, next) => {
  try {
    res.json({
      status: "success",
      msg: "Post updated successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

const deletePost = (req, res, next) => {
  try {
    res.json({
      status: "success",
      msg: "Post deleted successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

const getSinglePost = (req, res, next) => {
  try {
    res.json({
      status: "success",
      msg: "A single post",
    });
  } catch (error) {
    console.log(error);
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
