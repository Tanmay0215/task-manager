import api from "./api";

export const todoService = {
  getTodos: async () => {
    try {
      const response = await api.get("/todos");
      return { success: true, todos: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Failed to fetch todos",
      };
    }
  },

  createTodo: async (text) => {
    try {
      const response = await api.post("/todos", { text });
      return { success: true, todo: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Failed to create todo",
      };
    }
  },

  updateTodo: async (id, data) => {
    try {
      const response = await api.put(`/todos/${id}`, data);
      return { success: true, todo: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Failed to update todo",
      };
    }
  },

  deleteTodo: async (id) => {
    try {
      await api.delete(`/todos/${id}`);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Failed to delete todo",
      };
    }
  },

  toggleComplete: async (id) => {
    try {
      const response = await api.patch(`/todos/${id}/complete`);
      return { success: true, todo: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Failed to toggle todo",
      };
    }
  },
};

export default todoService;
