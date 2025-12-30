import { useTransactions } from "../../context/TransactionContext";
import { useCurrency } from "../../context/CurrencyContext";

function MonthlyBreakdown() {
  const { transactions } = useTransactions();
  const { convert, symbol } = useCurrency();

  const breakdown = Object.values(
    transactions
      .filter((tx) => tx.type === "expense")
      .reduce((acc, tx) => {
        const month = new Date(tx.date).toLocaleString("default", {
          month: "long",
          year: "numeric",
        });

        acc[month] = acc[month] || { month, total: 0 };
        acc[month].total += tx.amount;
        return acc;
      }, {})
  );

  return (
    <div className="bg-white dark:bg-gray-900 p-4 rounded shadow">
      <h3 className="font-semibold mb-4 text-black dark:text-white">
        Monthly Expense Breakdown
      </h3>

      {breakdown.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No data</p>
      ) : (
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b dark:border-gray-700">
              <th className="text-left p-2 text-black dark:text-white">
                Month
              </th>
              <th className="text-right p-2 text-black dark:text-white">
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            {breakdown.map((item) => (
              <tr
                key={item.month}
                className="border-b dark:border-gray-800"
              >
                <td className="p-2 text-gray-700 dark:text-gray-300">
                  {item.month}
                </td>
                <td className="p-2 text-right font-medium text-gray-700 dark:text-gray-300">
                  {symbol}{convert(item.total)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default MonthlyBreakdown;
