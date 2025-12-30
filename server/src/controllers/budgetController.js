import Budget from "../models/Budget.js";
import Transaction from "../models/Transaction.js";

// @desc Set or update monthly budget
// @route POST /api/budget
export const setBudget = async (req, res) => {
  const { monthlyLimit } = req.body;

  if (monthlyLimit === undefined || monthlyLimit < 0) {
    return res.status(400).json({ message: "Invalid budget amount" });
  }

  const budget = await Budget.findOneAndUpdate(
    { user: req.user._id },
    { monthlyLimit },
    { new: true, upsert: true }
  );

  res.json(budget);
};

// @desc Get budget + spending status
// @route GET /api/budget
export const getBudgetStatus = async (req, res) => {
  const budget = await Budget.findOne({ user: req.user._id });

  if (!budget) {
    return res.json({
      monthlyLimit: 0,
      totalExpense: 0,
      exceeded: false,
    });
  }

  const startOfMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    1
  );

  const expenses = await Transaction.aggregate([
    {
      $match: {
        user: req.user._id,
        type: "expense",
        date: { $gte: startOfMonth },
      },
    },
    {
      $group: {
        _id: null,
        total: { $sum: "$amount" },
      },
    },
  ]);

  const totalExpense = expenses[0]?.total || 0;

  res.json({
    monthlyLimit: budget.monthlyLimit,
    totalExpense,
    exceeded: totalExpense > budget.monthlyLimit,
  });
};
