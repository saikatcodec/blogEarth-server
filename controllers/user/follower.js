const User = require("../../models/User");
const appError = require("../../utils/appError");

const addFollowing = async (req, res, next) => {
  try {
    // Find logged user
    const user_id = req.user;
    const loggedUser = await User.findById(user_id);

    if (!loggedUser) {
      return next(appError("Please log in again", 401));
    }

    // Find the following user
    const { id } = req.params;
    const secondUser = await User.findById(id);

    if (id === user_id) {
      return next(appError("Not possible for same user", 400));
    }

    if (!secondUser) {
      return next(appError("User Not Found", 404));
    }

    // Push the following user
    loggedUser.following.push(secondUser._id);
    await loggedUser.save();

    // push the followers
    secondUser.followers.push(loggedUser._id);
    await secondUser.save();

    res.json({
      status: "success",
      msg: `You followed ${secondUser.fullname}`,
    });
  } catch (error) {
    next(appError(error.message));
  }
};

const removeFollowing = (req, res) => {
  try {
    res.json({
      status: "success",
      msg: "Following is removed",
    });
  } catch (error) {
    console.log(error);
  }
};

const getFollowers = (req, res) => {
  try {
    res.json({
      status: "success",
      msg: "Followers list",
    });
  } catch (error) {
    console.log(error);
  }
};

const getFollowing = (req, res) => {
  try {
    res.json({
      status: "success",
      msg: "Following users list",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  addFollowing,
  removeFollowing,
  getFollowers,
  getFollowing,
};
