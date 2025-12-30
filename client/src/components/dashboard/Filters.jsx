function Filters({ filters, setFilters }) {
  return (
    <div
      className="
        bg-white dark:bg-gray-900
        border border-gray-200 dark:border-gray-800
        p-4 rounded-xl shadow-sm mb-6
        grid grid-cols-2 md:grid-cols-5 gap-4
      "
    >
      {/* Search */}
      <input
        type="text"
        placeholder="Search title..."
        className="
          col-span-2 px-3 py-2 rounded-lg
          bg-gray-100 dark:bg-gray-800
          text-gray-900 dark:text-gray-100
          placeholder-gray-500 dark:placeholder-gray-400
          border border-gray-300 dark:border-gray-700
          focus:outline-none focus:ring-2 focus:ring-indigo-500
        "
        value={filters.search}
        onChange={(e) =>
          setFilters({ ...filters, search: e.target.value })
        }
      />

      {/* Type */}
      <select
        className="
          px-3 py-2 rounded-lg
          bg-gray-100 dark:bg-gray-800
          text-gray-900 dark:text-gray-100
          border border-gray-300 dark:border-gray-700
          focus:outline-none focus:ring-2 focus:ring-indigo-500
        "
        value={filters.type}
        onChange={(e) =>
          setFilters({ ...filters, type: e.target.value })
        }
      >
        <option value="">All Types</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      {/* Category */}
      <select
        className="
          px-3 py-2 rounded-lg
          bg-gray-100 dark:bg-gray-800
          text-gray-900 dark:text-gray-100
          border border-gray-300 dark:border-gray-700
          focus:outline-none focus:ring-2 focus:ring-indigo-500
        "
        value={filters.category}
        onChange={(e) =>
          setFilters({ ...filters, category: e.target.value })
        }
      >
        <option value="">All Categories</option>
        <option>Food</option>
        <option>Bills</option>
        <option>Travel</option>
        <option>Shopping</option>
        <option>Salary</option>
        <option>Others</option>
      </select>

      {/* Month */}
      <select
        className="
          px-3 py-2 rounded-lg
          bg-gray-100 dark:bg-gray-800
          text-gray-900 dark:text-gray-100
          border border-gray-300 dark:border-gray-700
          focus:outline-none focus:ring-2 focus:ring-indigo-500
        "
        value={filters.month}
        onChange={(e) =>
          setFilters({ ...filters, month: e.target.value })
        }
      >
        <option value="">All Months</option>
        {[...Array(12)].map((_, i) => (
          <option key={i} value={i + 1}>
            {new Date(0, i).toLocaleString("default", { month: "long" })}
          </option>
        ))}
      </select>

      {/* Year */}
      <input
        type="number"
        placeholder="Year"
        className="
          px-3 py-2 rounded-lg
          bg-gray-100 dark:bg-gray-800
          text-gray-900 dark:text-gray-100
          placeholder-gray-500 dark:placeholder-gray-400
          border border-gray-300 dark:border-gray-700
          focus:outline-none focus:ring-2 focus:ring-indigo-500
        "
        value={filters.year}
        onChange={(e) =>
          setFilters({ ...filters, year: e.target.value })
        }
      />
    </div>
  );
}

export default Filters;
