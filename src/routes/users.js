const express = require("express");
const {
  getAllUsers,
  getAllUsers1,
  getUser,
  updateUserById,
  deleteUserById,
  registerUser,
  fbCuri,
  registerUser1,
} = require("../controllers/userController");
const { login } = require("../middleware/authController");
const { verifyToken } = require("../middleware/jwt");
const router = express.Router();

router.post("/fb", registerUser1);
router.post("/signUp", registerUser);
router.get("/fbCur", getAllUsers1);
router.get("/", getAllUsers);
router.get("/:id", getUser);
router.put("/:id", updateUserById);
router.delete("/:id", deleteUserById);
module.exports = router;
