const User = require("../../models/User");
const appError = require("../../utils/appError");
const { generateToken } = require("../../utils/authToken");
const { hashPassword, matchPassword } = require("../../utils/hashedPassword");

const register = async (req, res, next) => {
  try {
    const { fullname, email, password, work, workPlace, country, about } =
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
      workPlace,
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

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // find user by email
    const user = await User.findOne({
      email,
    }).select("+password");

    if (!user) {
      return next(appError("Invalid Login Credentials", 406));
    }

    // match the user password
    const matched = await matchPassword(password, user.password);
    if (!matched) {
      return next(appError("Invalid Login Credentials", 406));
    }

    // generate login token
    const token = generateToken(user._id);
    if (!token) {
      return next(appError("Failed to generate token", 500));
    }

    res.json({
      status: "success",
      msg: "Login Successful",
      data: {
        user_email: user.email,
        token,
      },
    });
  } catch (error) {
    next(appError(error.message, 500));
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

module.exports = {
  register,
  login,
  logout,
};
