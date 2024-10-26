import React, { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { Expense } from "../../types/types";

const AddExpenseForm = () => {
  // Exercise: Consume the AppContext here
  // const { expenses, setExpenses } = useContext(AppContext);
  const context = useContext(AppContext);

  // Exercise: Create name and cost to state variables
  const [name, setName] = useState("");
  const [cost, setCost] = useState("");

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Create a new expense object
    let newExpense : Expense= {
      id: name,
      name: name,
      cost: parseInt(cost),
    }

    // Exercise: Add add new expense to expenses context array
    context.setExpenses([newExpense, ...context.expenses]);
  };

  return (
    <form onSubmit={(event) => onSubmit(event)}>
      <div className="row">
        <div className="col-sm">
          <label htmlFor="name">Name</label>
          <input
            required
            type="text"
            className="form-control"
            id="name"
            // value={""}
            value={name}
            // HINT: onChange={}
            onChange={(e) => setName(e.target.value)} // Update name state
          ></input>
        </div>
        <div className="col-sm">
          <label htmlFor="cost">Cost</label>
          <input
            required
            type="text"
            className="form-control"
            id="cost"
            // value={0}
            value={cost}
            // HINT: onChange={}
            onChange={(e) => setCost(e.target.value)} // Update cost state
          ></input>
        </div>
        <div className="col-sm">
          <button type="submit" className="btn btn-primary mt-3">
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddExpenseForm;
