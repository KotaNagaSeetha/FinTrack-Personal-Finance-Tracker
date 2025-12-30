import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useTransactions } from "../../context/TransactionContext";
import { useCurrency } from "../../context/CurrencyContext";

function MonthlyBarChart() {
  const { transactions } = useTransactions();
  const { convert, symbol } = useCurrency();

  const monthlyData = Object.values(
    transactions.reduce((acc, tx) => {
      const month = new Date(tx.date).toLocaleString("default", {
        month: "short",
      });

      acc[month] = acc[month] || { month, income: 0, expense: 0 };
      acc[month][tx.type] += tx.amount;
      return acc;
    }, {})
  ).map((item) => ({
    ...item,
    income: convert(item.income),
    expense: convert(item.expense),
  }));

  if (monthlyData.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-900 p-4 rounded shadow text-center text-gray-500 dark:text-gray-400">
        No monthly data
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 p-4 rounded shadow min-h-[320px]">
      <h3 className="font-semibold mb-4 text-black dark:text-white">
        Monthly Income vs Expense ({symbol})
      </h3>

      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={monthlyData}>
          <XAxis
            dataKey="month"
            stroke="#9CA3AF"
          />
          <YAxis stroke="#9CA3AF" />
          <Tooltip formatter={(value) => `${symbol}${value}`} />
          <Legend />
          <Bar dataKey="expense" fill="#EF4444" />
          <Bar dataKey="income" fill="#22C55E" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default MonthlyBarChart;
