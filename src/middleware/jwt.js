const jwt = require("jsonwebtoken");

exports.verifyToken = async (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Access denied. No token provided.",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded;
    return next();
  } catch (err) {
    return res.status(403).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
};
