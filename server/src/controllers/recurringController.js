import Recurring from "../models/Recurring.js";
import Transaction from "../models/Transaction.js";

// @desc Add recurring transaction
// @route POST /api/recurring
export const addRecurring = async (req, res) => {
  const { title, amount, category, type, dayOfMonth } = req.body;

  if (!title || !amount || !category || !type || !dayOfMonth) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const recurring = await Recurring.create({
    user: req.user._id,
    title,
    amount,
    category,
    type,
    dayOfMonth,
  });

  res.status(201).json(recurring);
};

// @desc Get all recurring transactions
// @route GET /api/recurring
export const getRecurring = async (req, res) => {
  const recurring = await Recurring.find({ user: req.user._id });
  res.json(recurring);
};

// @desc Process recurring transactions (auto add monthly)
// @route POST /api/recurring/process
export const processRecurring = async (req, res) => {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  const recurringList = await Recurring.find({ user: req.user._id });

  let created = [];

  for (const item of recurringList) {
    const last = item.lastProcessed;

    // Prevent duplicate creation in same month
    if (
      last &&
      last.getMonth() === currentMonth &&
      last.getFullYear() === currentYear
    ) {
      continue;
    }

    // Create transaction
    const transactionDate = new Date(
      currentYear,
      currentMonth,
      item.dayOfMonth
    );

    const tx = await Transaction.create({
      user: req.user._id,
      title: item.title,
      amount: item.amount,
      category: item.category,
      type: item.type,
      date: transactionDate,
    });

    item.lastProcessed = today;
    await item.save();

    created.push(tx);
  }

  res.json({
    message: "Recurring transactions processed",
    createdCount: created.length,
    transactions: created,
  });
};
