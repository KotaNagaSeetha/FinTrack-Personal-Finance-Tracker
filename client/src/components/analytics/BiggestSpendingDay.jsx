import { useTransactions } from "../../context/TransactionContext";
import { useCurrency } from "../../context/CurrencyContext";

function BiggestSpendingDay() {
  const { transactions } = useTransactions();
  const { convert, symbol } = useCurrency();

  const daily = Object.values(
    transactions
      .filter((tx) => tx.type === "expense")
      .reduce((acc, tx) => {
        const date = tx.date.split("T")[0];
        acc[date] = acc[date] || { date, amount: 0 };
        acc[date].amount += tx.amount;
        return acc;
      }, {})
  ).sort((a, b) => b.amount - a.amount)[0];

  return (
    <div className="bg-white dark:bg-gray-900 p-4 rounded shadow">
      <h3 className="font-semibold mb-4 text-black dark:text-white">
        Biggest Spending Day
      </h3>

      {daily ? (
        <>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {daily.date}
          </p>
          <p className="text-xl font-bold text-red-600">
            {symbol}{convert(daily.amount)}
          </p>
        </>
      ) : (
        <p className="text-gray-500 dark:text-gray-400">No data</p>
      )}
    </div>
  );
}

export default BiggestSpendingDay;
