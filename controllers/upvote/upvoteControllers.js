const appError = require("../../utils/appError");

const addUpvote = (req, res, next) => {
  try {
    res.json({
      status: "success",
      msg: "Upvote added successfully",
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
