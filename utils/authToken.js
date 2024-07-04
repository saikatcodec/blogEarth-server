const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  const KEY = process.env.JWT_KEY || "secret";
  return jwt.sign({ id }, KEY, {
    expiresIn: "1h",
  });
};

module.exports = {
  generateToken,
};
