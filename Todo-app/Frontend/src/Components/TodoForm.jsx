import React, { useState } from "react";
import { useTodos } from "../Context/todoContext.jsx";

const TodoForm = () => {
  const { addTodo } = useTodos();
  const [titleData, setTitleData] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!titleData.trim()) return; 
    addTodo(titleData);
    setTitleData(""); 
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
      <h2 className="text-xl font-semibold mb-4 text-center">➕ Add a New Todo</h2>
      
      <form onSubmit={handleSubmit} className="flex items-center space-x-3">
        <input
          type="text"
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={titleData}
          onChange={(e) => setTitleData(e.target.value)}
          placeholder="Enter your task..."
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition-all"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default TodoForm;
