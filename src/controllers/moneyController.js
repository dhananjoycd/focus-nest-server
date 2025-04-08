const { ObjectId } = require("mongodb");
const {
  createDB,
  findDB,
  findOneDB,
  updateDB,
  deleteDB,
  dbSearch,
} = require("../services/userService");

const dbCollection = "money";

// create Add Monney datbase
async function addEarning(req, res) {
  try {
    const newEarning = { ...req.body, transactionType: "earning" };
    await createDB(newEarning, dbCollection);
    return res.status(201).json({
      message: "You have added a new Earning successfully",
      data: newEarning,
    });
  } catch (error) {
    console.error("Error to addEarning", error);
    res.status(500).json({ message: "Server error", error });
  }
}
async function addExpense(req, res) {
  try {
    const newExpenses = { ...req.body, transactionType: "expense" };
    await createDB(newExpenses, dbCollection);
    return res.status(201).json({
      message: "You have added a new Expense successfully",
      data: newExpenses,
    });
  } catch (error) {
    console.error("Error to addEarning", error);
    res.status(500).json({ message: "Server error", error });
  }
}

// Gett all data for earning and expenses
async function getEarnings(req, res) {
  try {
    const userId = req?.query?.uid;
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }
    const earnings = await findDB(dbCollection, {
      uid: userId,
      transactionType: "earning",
    });
    res.status(200).json(earnings);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
}
async function getExpenses(req, res) {
  try {
    const userId = req?.query?.uid;
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }
    const earnings = await findDB(dbCollection, {
      uid: userId,
      transactionType: "expense",
    });
    res.status(200).json(earnings);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
}

// get data by condition
async function getEarning(req, res) {
  try {
    const earning = await findOneDB(dbCollection, req.params.id, "earning");
    if (!earning) return res.status(404).json({ message: "Earning not found" });
    res.status(200).json(earning);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
}
async function getExpense(req, res) {
  try {
    const earning = await findOneDB(dbCollection, req.params.id, "expense");
    if (!earning)
      return res.status(404).json({ message: "Expenses not found" });
    res.status(200).json(earning);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
}

// update data by ID
async function updateMoneyById(req, res) {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const result = await updateDB(dbCollection, id, updates);
    if (result.modifiedCount === 0)
      return res.status(404).json({ message: "Data not found" });
    res.status(200).json({ message: "Data updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
}

// Delete Operation
async function deleteEarningById(req, res) {
  try {
    const result = await deleteDB(dbCollection, req.params, "earning");
    if (result.deletedCount === 0)
      return res.status(404).json({ message: "Data not found" });
    res.status(200).json({ message: "Data deleted successfully" });
  } catch (error) {
    console.log("udated data errrorrrr", error);
    res.status(500).json({ message: "Server error", error });
  }
}
async function deleteExpensesById(req, res) {
  try {
    const result = await deleteDB(dbCollection, req.params, "expense");
    if (result.deletedCount === 0)
      return res.status(404).json({ message: "Data not found" });
    res.status(200).json({ message: "Data deleted successfully" });
  } catch (error) {
    console.log("udated data errrorrrr", error);
    res.status(500).json({ message: "Server error", error });
  }
}

// searchData by query

async function searchData(req, res) {
  try {
    const userId = req?.query?.uid;
    const transactionType = req?.query?.type;
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }
    if (
      !transactionType ||
      (transactionType !== "earning" && transactionType !== "expense")
    ) {
      return res.status(400).json({
        message: "Valid transaction type (earning/expense) is required",
      });
    }
    const results = await dbSearch(
      dbCollection,
      req.query.q,
      userId,
      transactionType
    );

    res.json(results);
  } catch (error) {
    console.error("Error fetching search data:", error);
    res.status(500).json({ message: "Server error", error });
  }
}

module.exports = {
  addEarning,
  getEarnings,
  addExpense,
  getExpenses,
  getEarning,
  getExpense,
  updateMoneyById,
  deleteEarningById,
  deleteExpensesById,
  searchData,
};
