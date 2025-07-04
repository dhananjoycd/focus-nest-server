const jwt = require("jsonwebtoken");

exports.verifyToken = async (req, res, next) => {
  const jwt_token = req.cookies?.jwt_token;

  console.log("All cookies:", req.cookies);

  if (!jwt_token) {
    return res.status(401).json({
      success: false,
      message: "Access denied. No token provided.",
    });
  }

  try {
    const decoded = jwt.verify(jwt_token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded;

    console.log("reeeq", req);
    return next();
  } catch (err) {
    return res.status(403).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
};
