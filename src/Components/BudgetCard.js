import React from "react";
import { currencyFormater } from "../Utils/currencyFormater";
import { Button, Card, ProgressBar, Stack } from "react-bootstrap";

export default function BudgetCard({
  name,
  amount,
  max,
  gray,
  onAddExpenseClick,
  hideButtons,
  onViewExpenseClick,
}) {
  const className = [];

  if (amount > max) {
    className.push("bg-danger", "bg-opacity-10");
  } else if (gray) {
    className.push("bg-light");
  }
  return (
    <Card className={className.join(" ")}>
      <Card.Body>
        <Card.Title>
          <div>{name}</div>
          <div>
            {currencyFormater.format(amount)}
            {max && `/${currencyFormater.format(max)}`}
          </div>
        </Card.Title>
        {max && (
          <ProgressBar
            className="rounded-pill"
            variant={getProgressBarVariant(amount, max)}
            min={0}
            max={max}
            now={amount}
          />
        )}
        {!hideButtons && (
          <Stack direction="horizontal" gap="2" className="mt-4">
            <Button
              variant="outline-primary"
              className="ms-auto"
              onClick={() => onAddExpenseClick()}
            >
              Add Expenses
            </Button>
            <Button variant="outline-secondary" onClick={onViewExpenseClick}>
              View Expenses
            </Button>
          </Stack>
        )}
      </Card.Body>
    </Card>
  );
}

function getProgressBarVariant(amount, max) {
  const ratio = amount / max;
  console.log(ratio);
  if (ratio < 0.5) return "primary";
  if (ratio < 0.75) return "warning";
  return "danger";
}
