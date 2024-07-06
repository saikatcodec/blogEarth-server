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

const removeFollowing = async (req, res, next) => {
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

    // Check the list
    if (
      loggedUser.following.findIndex(
        (user) => JSON.stringify(user) === JSON.stringify(secondUser._id)
      ) === -1
    ) {
      return next(appError("User not available in your following list", 404));
    }

    if (
      secondUser.followers.findIndex(
        (user) => JSON.stringify(user) === JSON.stringify(loggedUser._id)
      ) === -1
    ) {
      return next(appError("User not available in followers list", 404));
    }

    // remove the user from follower and following list
    loggedUser.following = loggedUser.following.filter(
      (user) => JSON.stringify(user) !== JSON.stringify(secondUser._id)
    );
    await loggedUser.save();

    secondUser.followers = secondUser.followers.filter(
      (user) => JSON.stringify(user) !== JSON.stringify(loggedUser._id)
    );
    await secondUser.save();

    res.json({
      status: "success",
      msg: `You unfollowed ${secondUser.fullname}`,
    });
  } catch (error) {
    next(appError(error.message));
  }
};

const getFollowers = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).populate("followers");

    if (!user) {
      return next(appError("User not found", 404));
    }

    const followers = user.followers;

    res.json({
      status: "success",
      msg: `${followers.length} people followed you`,
      data: followers,
    });
  } catch (error) {
    next(appError(error.message));
  }
};

const getFollowing = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).populate("following");

    if (!user) {
      return next(appError("User not found", 404));
    }

    const following = user.following;

    res.json({
      status: "success",
      msg: `You followed ${following.length} people`,
      data: following,
    });
  } catch (error) {
    next(appError(error.message));
  }
};

module.exports = {
  addFollowing,
  removeFollowing,
  getFollowers,
  getFollowing,
};
