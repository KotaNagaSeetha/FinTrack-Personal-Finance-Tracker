import Transaction from "../models/Transaction.js";

// @desc Category-wise expense breakdown
// @route GET /api/analytics/category
export const categoryAnalytics = async (req, res) => {
  const data = await Transaction.aggregate([
    {
      $match: {
        user: req.user._id,
        type: "expense",
      },
    },
    {
      $group: {
        _id: "$category",
        total: { $sum: "$amount" },
      },
    },
    {
      $project: {
        _id: 0,
        category: "$_id",
        total: 1,
      },
    },
  ]);

  res.json(data);
};

// @desc Monthly income vs expense
// @route GET /api/analytics/monthly
export const monthlyAnalytics = async (req, res) => {
  const year = Number(req.query.year) || new Date().getFullYear();

  const data = await Transaction.aggregate([
    {
      $match: {
        user: req.user._id,
        date: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`),
        },
      },
    },
    {
      $group: {
        _id: {
          month: { $month: "$date" },
          type: "$type",
        },
        total: { $sum: "$amount" },
      },
    },
    {
      $group: {
        _id: "$_id.month",
        income: {
          $sum: {
            $cond: [{ $eq: ["$_id.type", "income"] }, "$total", 0],
          },
        },
        expense: {
          $sum: {
            $cond: [{ $eq: ["$_id.type", "expense"] }, "$total", 0],
          },
        },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ]);

  res.json(data);
};

// @desc Top 3 spending categories
// @route GET /api/analytics/top-categories
export const topCategories = async (req, res) => {
  const data = await Transaction.aggregate([
    {
      $match: {
        user: req.user._id,
        type: "expense",
      },
    },
    {
      $group: {
        _id: "$category",
        total: { $sum: "$amount" },
      },
    },
    { $sort: { total: -1 } },
    { $limit: 3 },
    {
      $project: {
        _id: 0,
        category: "$_id",
        total: 1,
      },
    },
  ]);

  res.json(data);
};

// @desc Biggest spending day
// @route GET /api/analytics/biggest-day
export const biggestSpendingDay = async (req, res) => {
  const data = await Transaction.aggregate([
    {
      $match: {
        user: req.user._id,
        type: "expense",
      },
    },
    {
      $group: {
        _id: "$date",
        total: { $sum: "$amount" },
      },
    },
    { $sort: { total: -1 } },
    { $limit: 1 },
  ]);

  res.json(data[0] || {});
};

// @desc Monthly category breakdown
// @route GET /api/analytics/monthly-category
export const monthlyCategoryBreakdown = async (req, res) => {
  const year = Number(req.query.year) || new Date().getFullYear();

  const data = await Transaction.aggregate([
    {
      $match: {
        user: req.user._id,
        type: "expense",
        date: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`),
        },
      },
    },
    {
      $group: {
        _id: {
          month: { $month: "$date" },
          category: "$category",
        },
        total: { $sum: "$amount" },
      },
    },
    {
      $project: {
        _id: 0,
        month: "$_id.month",
        category: "$_id.category",
        total: 1,
      },
    },
    { $sort: { month: 1 } },
  ]);

  res.json(data);
};
