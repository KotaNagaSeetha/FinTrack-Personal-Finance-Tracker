import { useTransactions } from "../../context/TransactionContext";
import { useCurrency } from "../../context/CurrencyContext";

function TopCategories() {
  const { transactions } = useTransactions();
  const { convert, symbol } = useCurrency();

  const data = Object.values(
    transactions
      .filter((tx) => tx.type === "expense")
      .reduce((acc, tx) => {
        acc[tx.category] = acc[tx.category] || {
          category: tx.category,
          amount: 0,
        };
        acc[tx.category].amount += tx.amount;
        return acc;
      }, {})
  )
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 3);

  return (
    <div className="bg-white dark:bg-gray-900 p-4 rounded shadow">
      <h3 className="font-semibold mb-4 text-black dark:text-white">
        Top Categories
      </h3>

      {data.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No data</p>
      ) : (
        <ul className="space-y-2 text-sm">
          {data.map((item) => (
            <li
              key={item.category}
              className="flex justify-between text-gray-700 dark:text-gray-300"
            >
              <span>{item.category}</span>
              <span className="font-medium">
                {symbol}{convert(item.amount)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TopCategories;
