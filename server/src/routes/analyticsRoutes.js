import express from "express";
import {
  categoryAnalytics,
  monthlyAnalytics,
  topCategories,
  biggestSpendingDay,
  monthlyCategoryBreakdown,
} from "../controllers/analyticsController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/category", protect, categoryAnalytics);
router.get("/monthly", protect, monthlyAnalytics);
router.get("/top-categories", protect, topCategories);
router.get("/biggest-day", protect, biggestSpendingDay);
router.get("/monthly-category", protect, monthlyCategoryBreakdown);

export default router;
