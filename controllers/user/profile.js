const { deleteFile } = require("../../configs/cloudinary");
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
    const userFound = await User.findById(user_id);

    if (!userFound) {
      return next(appError("User Not Found", 404));
    }

    const user = await User.findByIdAndUpdate(
      user_id,
      {
        fullname,
        work,
        workPlace,
        country,
        about,
      },
      {
        new: true,
      }
    );

    // Create clone of user
    const tempUser = user.$clone();
    tempUser.password = "";

    res.json({
      status: "success",
      msg: "Profile Update Succesful",
      data: tempUser,
    });
  } catch (error) {
    next(appError(error.message));
  }
};

const updateProfilePic = async (req, res, next) => {
  try {
    const user_id = req.user;
    const userFound = await User.findById(user_id);

    if (!userFound) {
      return next(appError("User Not Found", 404));
    }

    // Delete existing image from server
    const image_id = userFound.profilePic?.file_id;
    await deleteFile(image_id);

    // update new image in server
    const user = await User.findByIdAndUpdate(
      user_id,
      {
        profilePic: {
          path: req.file.path,
          file_id: req.file.filename,
        },
      },
      { new: true }
    );

    // Create clone of user
    const tempUser = user.$clone();
    tempUser.password = "";

    res.json({
      status: "success",
      msg: "Profile Picture Update Successfully",
      data: tempUser,
    });
  } catch (error) {
    next(appError(error.message));
  }
};

const updateCoverPhoto = async (req, res) => {
  try {
    const user_id = req.user;
    const userFound = await User.findById(user_id);

    if (!userFound) {
      return next(appError("User Not Found", 404));
    }

    // Delete existing image from server
    const image_id = userFound.coverPhoto?.file_id;
    await deleteFile(image_id);

    // update new image in server
    const user = await User.findByIdAndUpdate(
      user_id,
      {
        coverPhoto: {
          path: req.file.path,
          file_id: req.file.filename,
        },
      },
      { new: true }
    );

    // Create clone of user
    const tempUser = user.$clone();
    tempUser.password = "";

    res.json({
      status: "success",
      msg: "Cover Photo Update Successfully",
      data: tempUser,
    });
  } catch (error) {
    next(appError(error.message));
  }
};

module.exports = {
  getProfileInfo,
  updateProfileInfo,
  updateProfilePic,
  updateCoverPhoto,
};
