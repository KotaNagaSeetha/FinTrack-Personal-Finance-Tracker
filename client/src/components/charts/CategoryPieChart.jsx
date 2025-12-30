import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useTransactions } from "../../context/TransactionContext";
import { useCurrency } from "../../context/CurrencyContext";

const COLORS = [
  "#4ADE80", // Green
  "#60A5FA", // Blue
  "#A78BFA", // Violet
  "#F87171", // Soft Red
  "#2DD4BF", // Teal
  "#FACC15"  // Gold
];

function CategoryPieChart() {
  const { transactions } = useTransactions();
  const { convert, symbol } = useCurrency();

  const data = Object.values(
    transactions
      .filter((tx) => tx.type === "expense")
      .reduce((acc, tx) => {
        acc[tx.category] = acc[tx.category] || {
          name: tx.category,
          value: 0,
        };
        acc[tx.category].value += tx.amount;
        return acc;
      }, {})
  ).map((item) => ({
    ...item,
    value: convert(item.value),
  }));

  if (data.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-900 p-4 rounded shadow text-center text-gray-500 dark:text-gray-400">
        No expense data
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 p-4 rounded shadow min-h-[320px]">
      <h3 className="font-semibold mb-4 text-black dark:text-white">
        Expense by Category ({symbol})
      </h3>

      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${symbol}${value}`} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CategoryPieChart;
