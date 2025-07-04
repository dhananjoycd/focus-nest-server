const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  try {
    const { uid, email } = req.body;
    if (!uid || !email) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        uid,
        email,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.cookie("jwt_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // example: 7 days
    });

    return res.status(200).json({
      success: true,
      message: "WOW! Permission accepted successfully",
      token,
      user: {
        id: uid,
        email: email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
