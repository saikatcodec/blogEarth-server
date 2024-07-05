const multer = require("multer");
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
const {
  profilePicStorage,
  coverPhotoStorage,
} = require("../configs/cloudinary");

const userRoute = express.Router();

// For profile pic uploader
const profileUploader = multer({ storage: profilePicStorage });
const coverUploader = multer({ storage: coverPhotoStorage });

// create user account
userRoute.post("/register", register);

// login an account
userRoute.post("/login", login);

// logout from the account
userRoute.get("/logout", logout);

// Login middleware to check authorization
userRoute.use(isLogin);

// Get profile info
userRoute.get("/profile/:id", getProfileInfo);

// Update profile info
userRoute.put("/profile", updateProfileInfo);

// Update profile picture
userRoute.put(
  "/profile-pic",
  profileUploader.single("profile"),
  updateProfilePic
);

// Update cover photo
userRoute.put("/cover-photo", coverUploader.single("cover"), updateCoverPhoto);

// Add following user
userRoute.put("/following/:id", addFollowing);

// Remove following user
userRoute.delete("/following/:id", removeFollowing);

// Get all followers
userRoute.get("/followers", getFollowers);

// Get all following user
userRoute.get("/following", getFollowing);

module.exports = userRoute;
