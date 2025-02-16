import { useState } from "react";
import { useTodos } from "../Context/todoContext.jsx";
import { Trash2, Edit } from "lucide-react";

const TodoList = () => {
  const { todos, deleteTodo, updateTodo } = useTodos();
  const [editingId, setEditingId] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState("");



  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
      <h2 className="text-xl font-semibold mb-4 text-center">📝 Todo List</h2>
      {todos.length === 0 ? (
        <p className="text-center text-gray-500">No todos yet. Add one! ✨</p>
      ) : (
        <ul className="space-y-3">
          {todos.map((todo) => (
            
              <li
                key={todo._id}
                className="flex items-center justify-between p-3 bg-gray-100 rounded-lg shadow-sm"
              >

                {editingId === todo._id ? (
                    <input
                      type="text"
                      value={updatedTitle}
                      onChange={(e) => setUpdatedTitle(e.target.value)}
                    />
                  ) : (
                    <span className="text-gray-700">{todo.title}</span>
                )}


                <div className="flex space-x-2">
                  

                  <button
                    onClick={() => {
                      if (editingId === todo._id) { //edit state
                        updateTodo(todo._id,{title : updatedTitle}) //updates the new tile 
                        setEditingId(null)  //remove the current id which we get in else part (down) by clicking the particular title id in icon
                      }else{
                        setEditingId(todo._id) //setting the id for which we clicked
                        setUpdatedTitle(todo.title)// the current tile which was already set we are showing as deafult in the input
                      }
                    }
                    }
                    className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => deleteTodo(todo._id)}
                    className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </li>
            
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoList;
