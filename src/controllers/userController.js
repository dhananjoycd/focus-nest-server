const {
  findDB,
  deleteUser,
  createDB,
  findOneDB,
  updateDB,
  deleteDB,
} = require("../services/userService");
const { getDB } = require("../server/config");
const User = require("../models/User");
const { ObjectId } = require("mongodb");
const FBUser = require("../models/FBUser");

const dbCollection = "users";

async function registerUser1(req, res) {
  const { email, password } = req.body;
  try {
    const newUser = new FBUser(email, password);
    await createDB(newUser, dbCollection);
    return res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error("Error in registerUser:", error); // Log the actual error
    res
      .status(500)
      .json({ message: "Server error (fail to create user)", error });
  }
}

async function registerUser(req, res) {
  const {
    uid,
    displayName,
    email,
    role,
    photoURL,
    phoneNumber,
    emailVerified,
  } = req.body;
  try {
    const db = getDB();
    const usersCollection = db.collection(dbCollection);

    const existingUser = await usersCollection.findOne({ uid }); // Check if user exists
    if (existingUser) {
      return res
        .status(200)
        .json({ message: "User already exists", user: existingUser });
    }

    if (!existingUser) {
      const newUser = new User(
        uid,
        displayName,
        email,
        role,
        photoURL,
        phoneNumber,
        emailVerified
      );
      await createDB(newUser, dbCollection);
      return res
        .status(201)
        .json({ message: "User registered successfully", user: newUser });
    }
  } catch (error) {
    console.error("Error in registerUser:", error); // Log the actual error
    res
      .status(500)
      .json({ message: "Server error (fail to create user)", error });
  }
}

async function getAllUsers1(req, res) {
  try {
    const users = await findDB(dbCollection);
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error (fail to get all users)", error });
  }
}

async function getAllUsers(req, res) {
  try {
    const users = await findDB(dbCollection);
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error (fail to get all users)", error });
  }
}

async function getUser(req, res) {
  try {
    const user = await findOneDB(dbCollection, req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
}

async function updateUserById(req, res) {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const result = await updateDB(dbCollection, id, updates);
    if (result.modifiedCount === 0)
      return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
}

async function deleteUserById(req, res) {
  try {
    const result = await deleteDB(dbCollection, req.params);
    if (result.deletedCount === 0)
      return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.log("udated data errrorrrr", error);
    res.status(500).json({ message: "Server error", error });
  }
}

module.exports = {
  registerUser,
  getAllUsers,
  getUser,
  updateUserById,
  deleteUserById,
  registerUser1,
  getAllUsers1,
};
