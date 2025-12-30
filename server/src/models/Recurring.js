import mongoose from "mongoose";

const recurringSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: String,
      enum: ["Food", "Bills", "Travel", "Shopping", "Salary", "Others"],
      required: true,
    },
    type: {
      type: String,
      enum: ["income", "expense"],
      required: true,
    },
    dayOfMonth: {
      type: Number,
      required: true,
      min: 1,
      max: 31,
    },
    lastProcessed: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Recurring", recurringSchema);
