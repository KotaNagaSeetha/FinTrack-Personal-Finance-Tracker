import { useTransactions } from "../../context/TransactionContext";
import { useCurrency } from "../../context/CurrencyContext";

function SummaryCards() {
  const { transactions } = useTransactions();
  const { convert, symbol } = useCurrency();

  const totalIncome = transactions
    .filter((tx) => tx.type === "income")
    .reduce((sum, tx) => sum + tx.amount, 0);

  const totalExpense = transactions
    .filter((tx) => tx.type === "expense")
    .reduce((sum, tx) => sum + tx.amount, 0);

  const rawBalance = totalIncome - totalExpense;
  const balance = Math.max(rawBalance, 0);
  const overspent = rawBalance < 0 ? Math.abs(rawBalance) : 0;

  const baseCard = `
    rounded-2xl p-6 shadow-lg
    bg-white
    border border-gray-200
    dark:bg-gradient-to-br dark:from-slate-900 dark:to-slate-800
    dark:border-slate-700
  `;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      {/* Income */}
      <div className={baseCard}>
        <h3 className="text-sm text-gray-500 dark:text-slate-400 mb-2">
          Total Income
        </h3>
        <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
          {symbol}{convert(totalIncome)}
        </p>
      </div>

      {/* Expense */}
      <div className={baseCard}>
        <h3 className="text-sm text-gray-500 dark:text-slate-400 mb-2">
          Total Expense
        </h3>
        <p className="text-3xl font-bold text-red-600 dark:text-red-400">
          {symbol}{convert(totalExpense)}
        </p>
      </div>

      {/* Balance */}
      <div className={baseCard}>
        <h3 className="text-sm text-gray-500 dark:text-slate-400 mb-2">
          Balance
        </h3>
        <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
          {symbol}{convert(balance)}
        </p>
      </div>

      {/* Overspent */}
      {overspent > 0 && (
        <div
          className={`
            ${baseCard}
            border-red-300 dark:border-red-700
          `}
        >
          <h3 className="text-sm text-gray-500 dark:text-slate-400 mb-2">
            Overspent
          </h3>
          <p className="text-3xl font-bold text-red-600 dark:text-red-400">
            {symbol}{convert(overspent)}
          </p>
        </div>
      )}
    </div>
  );
}

export default SummaryCards;
