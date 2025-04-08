const express = require("express");
const {
  getAllUsers,
  getUser,
  updateUserById,
  deleteUserById,
  registerUser,
} = require("../controllers/userController");
const router = express.Router();

router.post("/signUp", registerUser);
router.get("/", getAllUsers);
router.get("/:id", getUser);
router.put("/:id", updateUserById);
router.delete("/:id", deleteUserById);
module.exports = router;
