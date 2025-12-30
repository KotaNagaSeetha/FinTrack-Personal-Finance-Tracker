import { useState } from "react";
import { useTransactions } from "../context/TransactionContext";

import SummaryCards from "../components/dashboard/SummaryCards";
import BudgetAlert from "../components/dashboard/BudgetAlert";
import Filters from "../components/dashboard/Filters";

import CategoryPieChart from "../components/charts/CategoryPieChart";
import MonthlyBarChart from "../components/charts/MonthlyBarChart";

import TransactionForm from "../components/transactions/TransactionForm";
import TransactionList from "../components/transactions/TransactionList";

function Dashboard() {
  const { transactions } = useTransactions();

  const [filters, setFilters] = useState({
    search: "",
    type: "",
    category: "",
    month: "",
    year: "",
  });

  const filteredTransactions = transactions.filter((tx) => {
    const txDate = new Date(tx.date);

    return (
      tx.title.toLowerCase().includes(filters.search.toLowerCase()) &&
      (filters.type ? tx.type === filters.type : true) &&
      (filters.category ? tx.category === filters.category : true) &&
      (filters.month
        ? txDate.getMonth() + 1 === Number(filters.month)
        : true) &&
      (filters.year
        ? txDate.getFullYear() === Number(filters.year)
        : true)
    );
  });

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 p-6 transition-colors duration-300">
      <h1 className="text-3xl font-bold mb-6 text-black dark:text-white">
        Dashboard
      </h1>

      {/* Summary Cards */}
      <SummaryCards />

      {/* Budget Alert */}
      <BudgetAlert />

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow">
          <CategoryPieChart />
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg shadow">
          <MonthlyBarChart />
        </div>
      </div>

      {/* Filters */}
      <Filters filters={filters} setFilters={setFilters} />

      {/* Add Transaction */}
      <TransactionForm />

      {/* Transaction List */}
      <TransactionList transactions={filteredTransactions} />
    </div>
  );
}

export default Dashboard;
