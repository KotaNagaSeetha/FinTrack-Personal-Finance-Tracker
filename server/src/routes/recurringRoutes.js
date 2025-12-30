import express from "express";
import {
  addRecurring,
  getRecurring,
  processRecurring,
} from "../controllers/recurringController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, addRecurring);
router.get("/", protect, getRecurring);
router.post("/process", protect, processRecurring);

export default router;
