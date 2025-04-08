const express = require("express");
const {
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
} = require("../controllers/moneyController");
const router = express.Router();

router.post("/addEarning", addEarning);
router.post("/addExpense", addExpense);

router.get("/earnings", getEarnings);
router.get("/expenses", getExpenses);

router.get("/earnings/:id", getEarning);
router.get("/expenses/:id", getExpense);

router.get("/search", searchData);

router.put("/:id", updateMoneyById);

router.delete("/earnings/:id", deleteEarningById);
router.delete("/expenses/:id", deleteExpensesById);
module.exports = router;
