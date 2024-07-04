const User = require("../models/User");
const appError = require("../utils/appError");
const { hashPassword } = require("../utils/hashedPassword");

const register = async (req, res, next) => {
  try {
    const { fullname, email, password, work, workAt, country, about } =
      req.body;

    // find user by email
    const userFound = await User.findOne({
      email,
    });
    if (userFound) {
      return next(appError("User already exists", 400));
    }

    // hash password
    const hash = await hashPassword(password);

    // save user to the database
    const user = await User.create({
      fullname,
      email,
      password: hash,
      work,
      workAt,
      country,
      about,
    });

    res.json({
      status: "success",
      msg: "Registration Successful",
      data: {
        user_id: user._id,
        user_name: user.fullname,
        user_email: user.email,
      },
    });
  } catch (error) {
    next(appError(error.message, 500));
  }
};

const login = (req, res) => {
  try {
    res.json({
      status: "success",
      msg: "Login Successful",
    });
  } catch (error) {
    console.log(error);
  }
};

const logout = (req, res) => {
  try {
    res.json({
      status: "success",
      msg: "Logout Successful",
    });
  } catch (error) {
    console.log(error);
  }
};

const getProfileInfo = (req, res) => {
  try {
    res.json({
      status: "success",
      msg: "Profile information",
    });
  } catch (error) {
    console.log(error);
  }
};

const updateProfileInfo = (req, res) => {
  try {
    res.json({
      status: "success",
      msg: "Update Profile information",
    });
  } catch (error) {
    console.log(error);
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

const addFollowing = (req, res) => {
  try {
    res.json({
      status: "success",
      msg: "Following is added",
    });
  } catch (error) {
    console.log(error);
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
  register,
  login,
  logout,
  getProfileInfo,
  updateProfileInfo,
  updateProfilePic,
  updateCoverPhoto,
  addFollowing,
  removeFollowing,
  getFollowers,
  getFollowing,
};
