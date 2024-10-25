import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import App from './App';

describe("Budget Tracking App Tests", () => {
  test("should add a new expense and update totals", () => {
    render(<App />);

    fireEvent.change(screen.getByPlaceholderText("Expense"), { target: { value: "Gambling" } });
    fireEvent.change(screen.getByPlaceholderText("0"), { target: { value: "562" } });
    fireEvent.click(screen.getByRole("button", { name: "Save" }));

    // Assertions for new expense
    expect(screen.getByText("Gambling")).toBeInTheDocument();
    expect(screen.getByText("$562")).toBeInTheDocument();

    // Budget calculations
    expect(screen.getByText(/Remaining: \$438/)).toBeInTheDocument();
    expect(screen.getByText(/Spent so far: \$562/)).toBeInTheDocument();
  });

  test("should delete an expense and update totals accordingly", () => {
    render(<App />);

    // Create an expense
    fireEvent.change(screen.getByPlaceholderText("Expense"), { target: { value: "Gambling" } });
    fireEvent.change(screen.getByPlaceholderText("0"), { target: { value: "562" } });
    fireEvent.click(screen.getByRole("button", { name: "Save" }));

    // Delete the created expense
    fireEvent.click(screen.getByRole("button", { name: "x" }));

    // Assertions for expense removal
    expect(screen.queryByText("Gambling")).not.toBeInTheDocument();
    expect(screen.queryByText("$562")).not.toBeInTheDocument();

    // Budget reset
    expect(screen.getByText(/Remaining: \$1000/)).toBeInTheDocument();
    expect(screen.getByText(/Spent so far: \$0/)).toBeInTheDocument();
  });

  test("should verify budget balance after operations", () => {
    render(<App />);

    // Add expense
    fireEvent.change(screen.getByPlaceholderText("Expense"), { target: { value: "Gambling" } });
    fireEvent.change(screen.getByPlaceholderText("0"), { target: { value: "562" } });
    fireEvent.click(screen.getByRole("button", { name: "Save" }));

    // Validate budget balance
    expect(screen.getByText(/Budget: \$1000/)).toBeInTheDocument();
    expect(screen.getByText(/Remaining: \$438/)).toBeInTheDocument();
    expect(screen.getByText(/Spent so far: \$562/)).toBeInTheDocument();

    // Remove expense and revalidate
    fireEvent.click(screen.getByRole("button", { name: "x" }));
    expect(screen.queryByText("Gambling")).not.toBeInTheDocument();

    // Verify reset budget balance
    expect(screen.getByText(/Remaining: \$1000/)).toBeInTheDocument();
    expect(screen.getByText(/Spent so far: \$0/)).toBeInTheDocument();
  });
});
