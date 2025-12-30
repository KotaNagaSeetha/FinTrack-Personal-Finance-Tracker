import { useTransactions } from "../../context/TransactionContext";
import { useCurrency } from "../../context/CurrencyContext";

function TransactionList({ transactions }) {
  const { loading, removeTransaction } = useTransactions();
  const { convert, symbol } = useCurrency();

  if (loading)
    return (
      <p className="text-gray-600 dark:text-gray-400">
        Loading transactions...
      </p>
    );

  if (transactions.length === 0) {
    return (
      <div
        className="
          bg-white dark:bg-gray-900
          border border-gray-200 dark:border-gray-800
          p-4 rounded-xl shadow-sm
          text-center text-gray-500 dark:text-gray-400
        "
      >
        No transactions found
      </div>
    );
  }

  return (
    <div
      className="
        bg-white dark:bg-gray-900
        border border-gray-200 dark:border-gray-800
        rounded-xl shadow-sm overflow-x-auto
      "
    >
      <table className="w-full">
        <thead className="border-b border-gray-200 dark:border-gray-800">
          <tr>
            <th className="p-3 text-left text-gray-700 dark:text-gray-300">
              Title
            </th>
            <th className="p-3 text-center text-gray-700 dark:text-gray-300">
              Amount
            </th>
            <th className="p-3 text-center text-gray-700 dark:text-gray-300">
              Type
            </th>
            <th className="p-3 text-center text-gray-700 dark:text-gray-300">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {transactions.map((tx) => (
            <tr
              key={tx._id}
              className="
                border-b border-gray-200 dark:border-gray-800
                hover:bg-gray-50 dark:hover:bg-gray-800
                transition
              "
            >
              <td className="p-3 text-gray-900 dark:text-gray-100">
                {tx.title}
              </td>

              <td className="p-3 text-center text-gray-900 dark:text-gray-100">
                {symbol}
                {convert(tx.amount)}
              </td>

              <td
                className={`p-3 text-center font-semibold ${
                  tx.type === "income"
                    ? "text-emerald-500"
                    : "text-red-400"
                }`}
              >
                {tx.type}
              </td>

              <td className="p-3 text-center">
                <button
                  onClick={() => removeTransaction(tx._id)}
                  className="
                    text-red-500 hover:text-red-600
                    dark:text-red-400 dark:hover:text-red-300
                    font-medium transition
                  "
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionList;
