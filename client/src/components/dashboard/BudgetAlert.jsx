import { useEffect, useState } from "react";
import { getBudgetStatus, setMonthlyBudget } from "../../services/budgetService";
import { useTransactions } from "../../context/TransactionContext";
import { useCurrency } from "../../context/CurrencyContext";

function BudgetAlert() {
  const { transactions } = useTransactions();
  const { convert, reverseConvert, symbol } = useCurrency();

  const [budget, setBudget] = useState(null);
  const [limitInput, setLimitInput] = useState("");

  const fetchBudget = async () => {
    try {
      const data = await getBudgetStatus();
      setBudget(data);
    } catch (err) {
      console.error("Failed to fetch budget", err);
    }
  };

  useEffect(() => {
    fetchBudget();
  }, [transactions]);

  const handleSetBudget = async () => {
    if (!limitInput) return;

    try {
      // ✅ Convert user-entered currency → INR before saving
      const limitInINR = reverseConvert(Number(limitInput));

      await setMonthlyBudget(limitInINR);
      setLimitInput("");
      fetchBudget();
    } catch (err) {
      console.error("Failed to set budget", err);
    }
  };

  if (!budget) return null;

  return (
    <div
      className={`
        p-4 rounded-xl shadow-sm mb-6 border
        ${
          budget.exceeded
            ? "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
            : "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800"
        }
      `}
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Budget Info */}
        <div>
          <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">
            Monthly Budget: {symbol}{convert(budget.monthlyLimit)}
          </h3>

          <p className="text-sm text-gray-700 dark:text-gray-300">
            Spent this month: {symbol}{convert(budget.totalExpense)}
          </p>

          {budget.exceeded && (
            <p className="text-red-600 dark:text-red-400 font-semibold mt-1">
              ⚠️ You crossed your monthly budget!
            </p>
          )}
        </div>

        {/* Set Budget */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <input
            type="number"
            placeholder={`Set budget (${symbol})`}
            className="
              h-11 w-full sm:w-44 px-3 rounded-lg
              bg-white dark:bg-gray-800
              text-gray-900 dark:text-gray-100
              placeholder-gray-500 dark:placeholder-gray-400
              border border-gray-300 dark:border-gray-700
              focus:outline-none focus:ring-2 focus:ring-indigo-500
            "
            value={limitInput}
            onChange={(e) => setLimitInput(e.target.value)}
          />

          <button
            onClick={handleSetBudget}
            disabled={!limitInput}
            className="
              h-11 px-6 rounded-lg
              bg-indigo-600 hover:bg-indigo-700
              text-white font-medium
              disabled:opacity-50 disabled:cursor-not-allowed
              transition
            "
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default BudgetAlert;
