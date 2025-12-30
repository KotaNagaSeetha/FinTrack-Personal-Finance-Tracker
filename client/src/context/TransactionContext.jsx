import { createContext, useContext, useEffect, useState } from "react";
import {
  getTransactions,
  addTransaction,
  deleteTransaction,
} from "../services/transactionService";

const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const data = await getTransactions();
      setTransactions(data || []);
    } catch (err) {
      console.error("Failed to fetch transactions", err);
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  };

  const createTransaction = async (tx) => {
    const newTx = await addTransaction(tx);
    setTransactions((prev) => [newTx, ...prev]);
  };

  const removeTransaction = async (id) => {
    await deleteTransaction(id);
    setTransactions((prev) => prev.filter((tx) => tx._id !== id));
  };

  useEffect(() => {
    const user = localStorage.getItem("fintrack_user");
    if (user) {
      fetchTransactions();
    }
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        loading,
        createTransaction,
        removeTransaction,
        fetchTransactions, // optional but useful
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactions = () => useContext(TransactionContext);

