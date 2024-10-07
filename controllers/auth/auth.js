const verifyUser = (req, res, next) => {
  res.json({
    status: "success",
    msg: "Token is valid",
  });
};

module.exports = verifyUser;
