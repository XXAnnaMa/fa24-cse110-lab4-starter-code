import { Request, Response } from "express";
import { expenses, budget } from "./constants";
import { createExpenseEndpoints } from "./expenses/expense-endpoints";
import { createBudgetEndpoints } from "./budget/budget-endpoints";
import express from "express";
import cors from "cors";

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// Initialize database
(async () => {
   const db = await initDB();

// Root endpoint to get test if the server is running
app.get("/", (req: Request, res: Response) => {
   res.send({ "data": "Hello, TypeScript Express!" });
   res.status(200);
});

createExpenseEndpoints(app, db);
createBudgetEndpoints(app, budget);
