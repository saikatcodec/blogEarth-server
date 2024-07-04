const User = require("../../models/User");
const appError = require("../../utils/appError");

const getProfileInfo = async (req, res, next) => {
  try {
    // Extract user from DB
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return next(appError("Invalid User", 400));
    }

    // Create clone of user
    const tempUser = user.$clone();
    tempUser.password = "";

    res.json({
      status: "success",
      msg: "Profile information",
      data: tempUser,
    });
  } catch (error) {
    next(appError(error.message));
  }
};

const updateProfileInfo = async (req, res, next) => {
  try {
    const { fullname, work, workPlace, country, about } = req.body;

    const user_id = req.user;
    await User.findByIdAndUpdate(user_id, {
      fullname,
      work,
      workPlace,
      country,
      about,
    });

    res.json({
      status: "success",
      msg: "Profile Update Succesful",
    });
  } catch (error) {
    next(appError(error.message));
  }
};

const updateProfilePic = (req, res) => {
  try {
    res.json({
      status: "success",
      msg: "Update Profile picture",
    });
  } catch (error) {
    console.log(error);
  }
};

const updateCoverPhoto = (req, res) => {
  try {
    res.json({
      status: "success",
      msg: "Update cover photo",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getProfileInfo,
  updateProfileInfo,
  updateProfilePic,
  updateCoverPhoto,
};
