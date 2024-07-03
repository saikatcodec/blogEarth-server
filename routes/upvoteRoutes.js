const express = require("express");
const {
  register,
  login,
  logout,
  getProfileInfo,
} = require("../controllers/userControllers");

const userRoute = express.Router();

// create user account
userRoute.post("/register", register);

// login an account
userRoute.post("/login", login);

// logout from the account
userRoute.get("/logout", logout);

// Get profile info
userRoute.get("/profile/:id", getProfileInfo);

module.exports = userRoute;
