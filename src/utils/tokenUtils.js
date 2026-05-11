const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const generateAccessToken = (user) => {
  return jwt.sign(
    {
      userId: user._id,
      email: user.email,
    },
    process.env.JWT_ACCESS_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
    }
  );
};

const generateRefreshToken = () => {
  return crypto.randomBytes(64).toString("hex");
};

const hashToken = (token) => {
  return crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
};

const generateMFAToken = (user) => {
  return jwt.sign(
    {
      userId: user._id,
      type: "mfa",
    },
    process.env.JWT_ACCESS_SECRET,
    {
      expiresIn: process.env.MFA_TOKEN_EXPIRES_IN,
    }
  );
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  hashToken,
  generateMFAToken,
};