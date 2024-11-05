import { useContext } from "react";
import { Expense } from "../../types/types";
import { AppContext } from "../../context/AppContext";
import { deleteExpense } from "../../utils/expense-utils";

const ExpenseItem = ({ id, description, cost }: Expense) => {
  const { expenses, setExpenses } = useContext(AppContext);

  const handleDeleteExpense = () => {
    deleteExpense(id);
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div>{description}</div>
      <div>${cost}</div>
      <button onClick={handleDeleteExpense} className="btn btn-danger btn-sm">
        x
      </button>
    </li>
  );
};

