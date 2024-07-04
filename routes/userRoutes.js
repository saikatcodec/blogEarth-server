const express = require("express");

const { register, login, logout } = require("../controllers/user/authencation");
const {
  getProfileInfo,
  updateProfileInfo,
  updateProfilePic,
  updateCoverPhoto,
} = require("../controllers/user/profile");
const {
  addFollowing,
  removeFollowing,
  getFollowers,
  getFollowing,
} = require("../controllers/user/follower");
const isLogin = require("../middlewares/isLogin");

const userRoute = express.Router();

// create user account
userRoute.post("/register", register);

// login an account
userRoute.post("/login", login);

// logout from the account
userRoute.get("/logout", logout);

// Get profile info
userRoute.get("/profile/:id", isLogin, getProfileInfo);

// Update profile info
userRoute.put("/profile", updateProfileInfo);

// Update profile picture
userRoute.put("/profile-pic", updateProfilePic);

// Update cover photo
userRoute.put("/cover-photo", updateCoverPhoto);

// Add following user
userRoute.put("/following/:id", addFollowing);

// Remove following user
userRoute.delete("/following/:id", removeFollowing);

// Get all followers
userRoute.get("/followers", getFollowers);

// Get all following user
userRoute.get("/following", getFollowing);

module.exports = userRoute;
