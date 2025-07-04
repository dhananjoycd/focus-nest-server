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
const { verifyToken } = require("../middleware/jwt");
const router = express.Router();

router.post("/fb", registerUser1);
router.post("/signUp", registerUser);
router.get("/fbCur", getAllUsers1);
router.get("/", verifyToken, getAllUsers);
router.get("/:id", verifyToken, getUser);
router.put("/:id", verifyToken, updateUserById);
router.delete("/:id", verifyToken, deleteUserById);
module.exports = router;
