const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.cookies?.token; // Retrieve token from cookies

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Access denied. No token provided." });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(403)
        .json({ success: false, message: "Invalid or expired token." });
    }

    req.user = decoded; // Attach decoded token data to request object
    return next();
  });
};

module.exports = verifyToken;
