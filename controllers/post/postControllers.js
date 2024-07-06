const createPost = (req, res, next) => {
  try {
    res.json({
      status: "success",
      msg: "Post created successfully",
    });
  } catch (error) {
    console.log(error);
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
