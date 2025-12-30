import { useState } from "react";
import { useTransactions } from "../../context/TransactionContext";

function TransactionForm() {
  const { createTransaction } = useTransactions();
  const [form, setForm] = useState({
    title: "",
    amount: "",
    type: "expense",
    category: "Food",
    date: new Date().toISOString().split("T")[0],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createTransaction({ ...form, amount: Number(form.amount) });
    setForm({ ...form, title: "", amount: "" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="
        bg-white dark:bg-gray-900
        border border-gray-200 dark:border-gray-800
        p-4 rounded-xl shadow-sm mb-6
        grid grid-cols-2 gap-3
      "
    >
      {/* Title */}
      <input
        placeholder="Title"
        className="
          col-span-2 px-3 py-2 rounded-lg
          bg-gray-100 dark:bg-gray-800
          text-gray-900 dark:text-gray-100
          placeholder-gray-500 dark:placeholder-gray-400
          border border-gray-300 dark:border-gray-700
          focus:outline-none focus:ring-2 focus:ring-indigo-500
        "
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      {/* Amount */}
      <input
        type="number"
        placeholder="Amount"
        className="
          px-3 py-2 rounded-lg
          bg-gray-100 dark:bg-gray-800
          text-gray-900 dark:text-gray-100
          placeholder-gray-500 dark:placeholder-gray-400
          border border-gray-300 dark:border-gray-700
          focus:outline-none focus:ring-2 focus:ring-indigo-500
        "
        value={form.amount}
        onChange={(e) => setForm({ ...form, amount: e.target.value })}
      />

      {/* Type */}
      <select
        className="
          px-3 py-2 rounded-lg
          bg-gray-100 dark:bg-gray-800
          text-gray-900 dark:text-gray-100
          border border-gray-300 dark:border-gray-700
          focus:outline-none focus:ring-2 focus:ring-indigo-500
        "
        value={form.type}
        onChange={(e) => setForm({ ...form, type: e.target.value })}
      >
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>

      {/* Category */}
      <select
        className="
          px-3 py-2 rounded-lg
          bg-gray-100 dark:bg-gray-800
          text-gray-900 dark:text-gray-100
          border border-gray-300 dark:border-gray-700
          focus:outline-none focus:ring-2 focus:ring-indigo-500
        "
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
      >
        <option>Food</option>
        <option>Bills</option>
        <option>Travel</option>
        <option>Shopping</option>
        <option>Salary</option>
        <option>Others</option>
      </select>

      {/* Date */}
      <input
        type="date"
        className="
          px-3 py-2 rounded-lg
          bg-gray-100 dark:bg-gray-800
          text-gray-900 dark:text-gray-100
          border border-gray-300 dark:border-gray-700
          focus:outline-none focus:ring-2 focus:ring-indigo-500
        "
        value={form.date}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
      />

      {/* Submit */}
      <button
        className="
          col-span-2 py-2 rounded-lg
          bg-indigo-600 hover:bg-indigo-700
          text-white font-semibold
          transition
        "
      >
        Add Transaction
      </button>
    </form>
  );
}

export default TransactionForm;
