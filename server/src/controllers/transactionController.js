import Transaction from "../models/Transaction.js";

// @desc Add new transaction
// @route POST /api/transactions
export const addTransaction = async (req, res) => {
  const { title, amount, type, category, date } = req.body;

  if (!title || !amount || !type || !category || !date) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const transaction = await Transaction.create({
    user: req.user._id,
    title,
    amount,
    type,
    category,
    date,
  });

  res.status(201).json(transaction);
};

// @desc Get all transactions for logged-in user
// @route GET /api/transactions
export const getTransactions = async (req, res) => {
  const transactions = await Transaction.find({ user: req.user._id }).sort({
    date: -1,
  });

  res.json(transactions);
};

// @desc Update transaction
// @route PUT /api/transactions/:id
export const updateTransaction = async (req, res) => {
  const transaction = await Transaction.findById(req.params.id);

  if (!transaction) {
    return res.status(404).json({ message: "Transaction not found" });
  }

  if (transaction.user.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: "Not authorized" });
  }

  const updatedTransaction = await Transaction.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(updatedTransaction);
};

// @desc Delete transaction
// @route DELETE /api/transactions/:id
export const deleteTransaction = async (req, res) => {
  const transaction = await Transaction.findById(req.params.id);

  if (!transaction) {
    return res.status(404).json({ message: "Transaction not found" });
  }

  if (transaction.user.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: "Not authorized" });
  }

  await transaction.deleteOne();
  res.json({ message: "Transaction removed" });
};
