import { useCurrency } from "../../context/CurrencyContext";

function CurrencySelector() {
  const { currency, setCurrency } = useCurrency();

  return (
    <select
      value={currency}
      onChange={(e) => setCurrency(e.target.value)}
      className="
        px-3 py-2 rounded-lg
        bg-gray-100 dark:bg-gray-800
        text-gray-900 dark:text-gray-100
        border border-gray-300 dark:border-gray-700
        focus:outline-none focus:ring-2 focus:ring-indigo-500
        transition
      "
    >
      <option value="INR">INR (₹)</option>
      <option value="USD">USD ($)</option>
      <option value="EUR">EUR (€)</option>
    </select>
  );
}

export default CurrencySelector;
