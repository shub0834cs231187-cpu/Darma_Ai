function getRequestUserId(req, fallback = "demo-user") {
  return req.user?.sub || req.body?.user_id || fallback;
}

function createHttpError(statusCode, detail) {
  const error = new Error(detail);
  error.statusCode = statusCode;
  error.detail = detail;
  return error;
}

module.exports = { getRequestUserId, createHttpError };
