import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { todoService } from "../services/todoService";
import { authService } from "../services/authService";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [loading, setLoading] = useState(true);
  const user = authService.getCurrentUser();

  const loadTodos = async () => {
    setLoading(true);
    const result = await todoService.getTodos();
    if (result.success) {
      setTodos(result.todos);
    } else {
      toast.error(result.error);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    const result = await todoService.createTodo(newTodo.trim());
    if (result.success) {
      setTodos([result.todo, ...todos]);
      setNewTodo("");
      toast.success("Todo added successfully!");
    } else {
      toast.error(result.error);
    }
  };

  const handleToggleComplete = async (id) => {
    const result = await todoService.toggleComplete(id);
    if (result.success) {
      setTodos(todos.map((t) => (t._id === id ? result.todo : t)));
    } else {
      toast.error(result.error);
    }
  };

  const handleDeleteTodo = async (id) => {
    const result = await todoService.deleteTodo(id);
    if (result.success) {
      setTodos(todos.filter((t) => t._id !== id));
      toast.success("Todo deleted successfully!");
    } else {
      toast.error(result.error);
    }
  };

  const handleLogout = () => {
    authService.logout();
    toast.success("Logged out successfully!");
    window.location.href = "/login";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold">Todo App</h1>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">
              Welcome, {user?.username}
            </span>
            <button
              onClick={handleLogout}
              className="text-sm px-3 py-1.5 rounded-md border hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        <form onSubmit={handleAddTodo} className="flex gap-3 mb-6">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new todo..."
            className="flex-1 rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            Add
          </button>
        </form>

        {todos.length === 0 ? (
          <p className="text-gray-600">No todos yet. Add one above!</p>
        ) : (
          <ul className="space-y-3">
            {todos.map((todo) => (
              <li
                key={todo._id}
                className={`flex items-center justify-between rounded-lg border bg-white px-4 py-3 ${
                  todo.completed ? "opacity-70" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => handleToggleComplete(todo._id)}
                    className="size-4"
                  />
                  <span
                    className={`text-sm ${
                      todo.completed ? "line-through" : ""
                    }`}
                  >
                    {todo.text}
                  </span>
                </div>
                <button
                  onClick={() => handleDeleteTodo(todo._id)}
                  className="text-red-600 text-sm hover:underline"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
};

export default TodoList;
