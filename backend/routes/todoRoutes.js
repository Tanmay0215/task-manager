import express from "express";
import { authenticateToken } from "../middleware/auth.js";
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  toggleComplete,
} from "../controllers/todoController.js";

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

// GET /api/todos - Get all todos for authenticated user
router.get("/", getTodos);

// POST /api/todos - Create new todo
router.post("/", createTodo);

// PUT /api/todos/:id - Update todo
router.put("/:id", updateTodo);

// DELETE /api/todos/:id - Delete todo
router.delete("/:id", deleteTodo);

// PATCH /api/todos/:id/complete - Toggle todo completion
router.patch("/:id/complete", toggleComplete);

export default router;
