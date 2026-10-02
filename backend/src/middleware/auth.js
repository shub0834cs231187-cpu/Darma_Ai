const { verifyToken } = require("../utils/jwt");

function parseBearerToken(headerValue) {
  if (!headerValue || !headerValue.startsWith("Bearer ")) {
    return null;
  }
  return headerValue.slice("Bearer ".length).trim();
}

function authenticateOptional(req, _res, next) {
  const token = parseBearerToken(req.headers.authorization);
  if (!token) {
    return next();
  }

  try {
    req.user = verifyToken(token);
  } catch (_error) {
    req.user = undefined;
  }

  return next();
}

function authenticateRequired(req, _res, next) {
  const token = parseBearerToken(req.headers.authorization);
  if (!token) {
    const error = new Error("Authentication credentials were not provided");
    error.statusCode = 401;
    return next(error);
  }

  try {
    req.user = verifyToken(token);
    return next();
  } catch (_error) {
    const error = new Error("Invalid token");
    error.statusCode = 401;
    return next(error);
  }
}

module.exports = {
  authenticateOptional,
  authenticateRequired,
};
