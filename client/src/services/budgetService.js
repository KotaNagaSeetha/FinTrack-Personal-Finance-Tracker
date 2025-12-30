import api from "./api";

export const getBudgetStatus = async () => {
  const res = await api.get("/budget");
  return res.data;
};

export const setMonthlyBudget = async (monthlyLimit) => {
  const res = await api.post("/budget", { monthlyLimit });
  return res.data;
};
