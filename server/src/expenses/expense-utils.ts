import { Expense } from "../types";
import { Request, Response } from "express";
import { Database } from "sqlite";

export async function createExpense(req: Request, res: Response, db: Database) {
  try {
    // Type casting the request body to the expected format.
    const { id, cost, description } = req.body as { id: string; cost: number; description: string };

    if (!id || !cost || !description) {
      return res.status(400).json({ error: "All fields are required" });
    }

    await db.run('INSERT INTO expenses (id, description, cost) VALUES (?, ?, ?);', [id, description, cost]);
    res.status(201).json({ id, description, cost });

  } catch (error) {
    res.status(400).json({ error: `Failed to create expense: ${error}` });
  }
}

export async function deleteExpense(req: Request, res: Response, db: Database) {
  // TODO: Implement deleteExpense function
  try {
    const id = req.params.id;

    await db.run('DELETE FROM expenses WHERE id = ?;', [id]);
    res.status(204).json({ message: "Expense successfully deleted" });
  } catch (error) {
    res.status(400).json({ error: `Failed to delete expense: ${error}` });
  }
}

export async function fetchExpenses(req: Request, res: Response, db: Database) {
  try {
    const expenses: Expense[] = await db.all('SELECT * FROM expenses;');
    res.status(200).json({ data: expenses });
  } catch (error) {
    res.status(400).json({ error: `Could not retrieve expenses: ${error}` });
  }
}
