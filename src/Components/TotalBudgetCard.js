import React from "react";
import BudgetCard from "./BudgetCard";
import { useBudgets } from "../Contexts/BudgetContext";

export default function TotalBudgetCard(props) {
  const { budgets, expenses } = useBudgets();
  const amount = expenses.reduce(
    (total, expenses) => total + expenses.amount,
    0
  );
  const max = budgets.reduce((total, budgets) => total + budgets.max, 0);

  return (
    <BudgetCard gray name="TotalBudget" amount={amount} max={max} hideButtons />
  );
}
