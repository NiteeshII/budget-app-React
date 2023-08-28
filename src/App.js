import Container from "react-bootstrap/Container";
import { Stack } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import BudgetCard from "./Components/BudgetCard";
import AddBudgetModal from "./Components/AddBudgetModal";
import AddExpensesModal from "./Components/AddExpensesModal";
import UncategorizedBudgetCard from "./Components/UncategorizedBudgetCard";
import ViewExpenseModal from "./Components/ViewExpenseModal";
import TotalBudgetCard from "./Components/TotalBudgetCard";
import { useState } from "react";
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "./Contexts/BudgetContext";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [addExpenseBudgetId, setAddExpenseBudgetID] = useState();
  const [viewExpensedBudgtId, setViewExpensedBudgtId] = useState();
  const { budgets, expenses, getBudgetExpenses } = useBudgets();

  console.log(addExpenseBudgetId, expenses);

  function openAddExpenseModal(budgetId) {
    setShowExpenseModal(true);
    setAddExpenseBudgetID(budgetId);

    async function getdata() {
      try {
        const data = await fetch("https://jsonplaceholder.typicode.com/users");
        const response = await data.json();

        return response;
      } catch (error) {
        console.log(error);
      }
    }

    const newData = getdata();
    console.log(newData, "newData");
  }
  return (
    <Container className="my-4">
      <Stack direction="horizontal" gap="2" className="mb-6">
        <h1 className="me-auto">Budgets</h1>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          Add Budget
        </Button>
        <Button variant="outline-primary" onClick={openAddExpenseModal}>
          Add Expense
        </Button>
      </Stack>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px , 1fr)",
          gap: "1rem",
          alignItems: "flex-start",
        }}
      >
        {budgets.map((Budget) => {
          const amount = getBudgetExpenses(Budget.id).reduce(
            (total, expense) => total + expense.amount,
            0
          );

          console.log(amount);
          return (
            <BudgetCard
              name={Budget.name}
              amount={amount}
              key={Budget.id}
              max={Budget.max}
              onAddExpenseClick={() => openAddExpenseModal(Budget.id)}
              onViewExpenseClick={() => setViewExpensedBudgtId(Budget.id)}
            />
          );
        })}
        <UncategorizedBudgetCard
          onAddExpenseClick={openAddExpenseModal}
          onViewExpenseClick={() =>
            setViewExpensedBudgtId(UNCATEGORIZED_BUDGET_ID)
          }
        />
        <TotalBudgetCard />
      </div>
      <AddBudgetModal
        show={showModal}
        handleClose={() => setShowModal(false)}
      />

      <AddExpensesModal
        show={showExpenseModal}
        defaultBudgetId={addExpenseBudgetId}
        handleClose={() => setShowExpenseModal(false)}
      />
      <ViewExpenseModal
        budgetId={viewExpensedBudgtId}
        handleClose={() => setViewExpensedBudgtId()}
      />
    </Container>
  );
}

export default App;
