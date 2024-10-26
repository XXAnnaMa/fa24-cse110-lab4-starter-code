import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import App from './App';

describe('Budget Tracking App Tests', () => {

  test('should correctly add an expense and reflect changes in budget totals', () => {
    render(<App />);

    // Locate input fields and button for expense creation
    const expenseNameField = screen.getByPlaceholderText("Expense");
    const expenseCostField = screen.getByPlaceholderText("0");
    const addExpenseButton = screen.getByText("Save");

    // Add an expense with different values
    fireEvent.change(expenseNameField, { target: { value: "Groceries" } });
    fireEvent.change(expenseCostField, { target: { value: "250" } });
    fireEvent.click(addExpenseButton);

    // Verify that the new expense shows up with correct values
    expect(screen.getByText("Groceries")).toBeInTheDocument();
    expect(screen.getByText("$250")).toBeInTheDocument();

    // Check budget updates for "Remaining" and "Spent so far"
    expect(screen.getByText("Remaining: $750")).toBeInTheDocument();
    expect(screen.getByText("Spent so far: $250")).toBeInTheDocument();
  });

  test('should remove an expense and reset budget totals correctly', () => {
    render(<App />);

    // Adding two expenses to test selective deletion
    const nameInput = screen.getByPlaceholderText("Expense");
    const costInput = screen.getByPlaceholderText("0");
    const saveButton = screen.getByText("Save");

    fireEvent.change(nameInput, { target: { value: "Rent" } });
    fireEvent.change(costInput, { target: { value: "500" } });
    fireEvent.click(saveButton);

    fireEvent.change(nameInput, { target: { value: "Utilities" } });
    fireEvent.change(costInput, { target: { value: "100" } });
    fireEvent.click(saveButton);

    // Confirm both expenses are present
    expect(screen.getByText("Rent")).toBeInTheDocument();
    expect(screen.getByText("$500")).toBeInTheDocument();
    expect(screen.getByText("Utilities")).toBeInTheDocument();
    expect(screen.getByText("$100")).toBeInTheDocument();

    // Check initial budget updates after adding expenses
    expect(screen.getByText("Remaining: $400")).toBeInTheDocument();
    expect(screen.getByText("Spent so far: $600")).toBeInTheDocument();

    // Remove the first expense ("Rent")
    const deleteRentButton = screen.getAllByText("x")[0];
    fireEvent.click(deleteRentButton);

    // Confirm "Rent" expense is removed and "Utilities" remains
    expect(screen.queryByText("Rent")).not.toBeInTheDocument();
    expect(screen.queryByText("$500")).not.toBeInTheDocument();
    expect(screen.getByText("Utilities")).toBeInTheDocument();
    expect(screen.getByText("$100")).toBeInTheDocument();

    // Verify remaining budget totals adjust correctly
    expect(screen.getByText("Remaining: $900")).toBeInTheDocument();
    expect(screen.getByText("Spent so far: $100")).toBeInTheDocument();
  });

  test('should validate that budget equation holds after adding and removing expenses', () => {
    render(<App />);

    const inputExpenseName = screen.getByPlaceholderText("Expense");
    const inputExpenseCost = screen.getByPlaceholderText("0");
    const saveExpenseButton = screen.getByText("Save");

    // Add a new expense with different amount
    fireEvent.change(inputExpenseName, { target: { value: "Subscription" } });
    fireEvent.change(inputExpenseCost, { target: { value: "150" } });
    fireEvent.click(saveExpenseButton);

    // Verify new expense presence and budget equation
    expect(screen.getByText("Subscription")).toBeInTheDocument();
    expect(screen.getByText("$150")).toBeInTheDocument();
    expect(screen.getByText("Remaining: $850")).toBeInTheDocument();
    expect(screen.getByText("Spent so far: $150")).toBeInTheDocument();
    expect(screen.getByText("Budget: $1000")).toBeInTheDocument();

    // Remove the expense and confirm the budget returns to its original state
    const deleteSubscriptionButton = screen.getByText("x");
    fireEvent.click(deleteSubscriptionButton);

    expect(screen.queryByText("Subscription")).not.toBeInTheDocument();
    expect(screen.queryByText("$150")).not.toBeInTheDocument();

    expect(screen.getByText("Remaining: $1000")).toBeInTheDocument();
    expect(screen.getByText("Spent so far: $0")).toBeInTheDocument();
    expect(screen.getByText("Budget: $1000")).toBeInTheDocument();
  });
});
