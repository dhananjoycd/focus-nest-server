const jwt = require("jsonwebtoken");

exports.verifyToken = async (req, res, next) => {
  const jwt_token = req.cookies?.jwt_token;

  if (!jwt_token) {
    return res.status(401).json({
      success: false,
      message: "Access denied. You must be logged in.",
    });
  }

  try {
    const decoded = jwt.verify(jwt_token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded;

    return next();
  } catch (err) {
    return res.status(403).json({
      success: false,
      message: "Invalid or expired credentials.",
    });
  }
};
