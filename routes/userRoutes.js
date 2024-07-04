const express = require("express");
const {
  getProfileInfo,
  updateProfileInfo,
  updateProfilePic,
  addFollowing,
  updateCoverPhoto,
  removeFollowing,
  getFollowers,
  getFollowing,
} = require("../controllers/userControllers");
const { register, login, logout } = require("../controllers/user/authencation");

const userRoute = express.Router();

// create user account
userRoute.post("/register", register);

// login an account
userRoute.post("/login", login);

// logout from the account
userRoute.get("/logout", logout);

// Get profile info
userRoute.get("/profile/:id", getProfileInfo);

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
