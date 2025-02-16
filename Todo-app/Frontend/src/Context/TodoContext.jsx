import { useContext, createContext, useState, useEffect } from "react";
import axiosInstance from "../lib/axiox"; 

const TodoContext = createContext(); 

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await axiosInstance.get("/todo");
        setTodos(res.data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };
    fetchTodos();
  }, []);

  const addTodo = async (title) => {
    try {
      const res = await axiosInstance.post("/todo/add", { title });
      setTodos((prev) => [...prev, res.data]);
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axiosInstance.delete(`/todo/${id}`);
      setTodos((prev) => prev.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const updateTodo = async (id, updatedData) => {
    try {
      await axiosInstance.put(`/todo/${id}`, updatedData);
      setTodos((prev) =>
        prev.map((todo) => (todo._id === id ? { ...todo, ...updatedData } : todo))
      );
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  return (
    <TodoContext.Provider value={{ todos, addTodo, deleteTodo, updateTodo }}>
      {children}
    </TodoContext.Provider>
  );
};


export const useTodos = () => {
  const context = useContext(TodoContext); 
  if (!context) {
    throw new Error("useTodos must be used within a TodoProvider");
  }
  return context;
};
