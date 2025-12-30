import { createContext, useContext, useEffect, useState } from "react";
import {
  getTransactions,
  addTransaction,
  deleteTransaction,
} from "../services/transactionService";

const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTransactions = async () => {
    setLoading(true);
    const data = await getTransactions();
    setTransactions(data);
    setLoading(false);
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
    fetchTransactions();
  }, []);

  return (
    <TransactionContext.Provider
      value={{ transactions, loading, createTransaction, removeTransaction }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactions = () => useContext(TransactionContext);
