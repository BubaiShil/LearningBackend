import React from "react";
import TodoForm from "../Components/TodoForm";
import TodoList from "../Components/TodoList";

const HomePage = () => {
  return (
    <div className="">
      <TodoForm/>
      <TodoList />
    </div>
  );
};

export default HomePage;
