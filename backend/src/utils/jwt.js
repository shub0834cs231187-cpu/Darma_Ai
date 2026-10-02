const jwt = require("jsonwebtoken");

const ACCESS_TOKEN_EXPIRE_MINUTES = 30;

function getSecretKey() {
  return process.env.SECRET_KEY || "your-secret-key-change-in-production";
}

function createAccessToken(data, expiresInMinutes = ACCESS_TOKEN_EXPIRE_MINUTES) {
  const payload = { ...data };
  return jwt.sign(payload, getSecretKey(), {
    algorithm: "HS256",
    expiresIn: `${expiresInMinutes}m`,
  });
}

function verifyToken(token) {
  return jwt.verify(token, getSecretKey(), {
    algorithms: ["HS256"],
  });
}

module.exports = {
  createAccessToken,
  verifyToken,
};
