import TopCategories from "../components/analytics/TopCategories";
import BiggestSpendingDay from "../components/analytics/BiggestSpendingDay";
import MonthlyBreakdown from "../components/analytics/MonthlyBreakdown";

function Analytics() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 p-6">
      <h1 className="text-3xl font-bold mb-6 text-black dark:text-white">
        Analytics
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <TopCategories />
        <BiggestSpendingDay />
      </div>

      <MonthlyBreakdown />
    </div>
  );
}

export default Analytics;
