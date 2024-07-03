const register = (req, res) => {
  try {
    res.json({
      status: "success",
      msg: "Registration Successful",
    });
  } catch (error) {
    console.log(error);
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

module.exports = {
  register,
  login,
  logout,
  getProfileInfo,
};
