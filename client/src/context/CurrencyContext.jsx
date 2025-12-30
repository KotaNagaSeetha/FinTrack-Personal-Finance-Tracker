import { createContext, useContext, useEffect, useState } from "react";

const CurrencyContext = createContext();

// Base currency = INR
const RATES = {
  INR: 1,
  USD: 0.012, // approx
  EUR: 0.011, // approx
};

const SYMBOLS = {
  INR: "₹",
  USD: "$",
  EUR: "€",
};

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState(
    localStorage.getItem("currency") || "INR"
  );

  useEffect(() => {
    localStorage.setItem("currency", currency);
  }, [currency]);

  /**
   * Convert INR → selected currency (for display)
   */
  const convert = (amountInINR) => {
    if (!amountInINR) return 0;
    return Math.round(amountInINR * RATES[currency] * 100) / 100;
  };

  /**
   * Convert selected currency → INR (for saving)
   */
  const reverseConvert = (amountInSelectedCurrency) => {
    if (!amountInSelectedCurrency) return 0;
    return Math.round((amountInSelectedCurrency / RATES[currency]) * 100) / 100;
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        convert,
        reverseConvert, // ✅ NEW
        symbol: SYMBOLS[currency],
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => useContext(CurrencyContext);
