import React, { useState, useEffect } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos"));
    if (savedTodos && savedTodos.length) {
      setTodos(savedTodos);
    } else {
      const initialTodos = [
        { id: 1, task: "Learn React", completed: false },
        { id: 2, task: "Build a Todo App", completed: false },
        { id: 3, task: "Practice Coding", completed: false },
      ];
      setTodos(initialTodos);
      localStorage.setItem("todos", JSON.stringify(initialTodos));
    }
  }, []);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setError("");
  };

  const handleAddTodo = () => {
    if (inputValue.trim() !== "") {
      if (todos.some((todo) => todo.task === inputValue)) {
        setError("Task already exists!");
      } else {
        const newTodo = { id: Date.now(), task: inputValue, completed: false };
        setTodos([...todos, newTodo]);
        setInputValue("");
        setError("");
        localStorage.setItem("todos", JSON.stringify([...todos, newTodo]));
      }
    } else {
      setError("Task cannot be empty!");
    }
  };

  const handleRemoveTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const handleEditTodo = (id, task) => {
    setEditingId(id);
    setEditValue(task);
  };

  const handleSaveEdit = (id) => {
    if (editValue.trim() !== "") {
      const newTodos = todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, task: editValue };
        }
        return todo;
      });
      setTodos(newTodos);
      setEditingId(null);
      setEditValue("");
      localStorage.setItem("todos", JSON.stringify(newTodos));
    } else {
      setError("Task cannot be empty!");
    }
  };

  const handleToggleComplete = (id) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const remainingTasks = todos.filter((todo) => !todo.completed).length;

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-purple-500 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-lg p-8 space-y-8 shadow-md">
        <h2 className="text-center text-3xl font-bold text-gray-900">
          Todo App
        </h2>
        <div className="flex">
          <input
            type="text"
            className="flex-1 py-2 px-4 border border-gray-300 rounded-l-lg focus:outline-none focus:border-blue-500 transition-colors duration-300"
            placeholder="Enter your todo..."
            value={inputValue}
            onChange={handleInputChange}
          />
          <button
            className="bg-blue-500 hover:bg-blue-600 focus:outline-none focus:bg-blue-600 text-white py-2 px-4 rounded-r-lg transition-all duration-300 transform hover:scale-105"
            onClick={handleAddTodo}
          >
            Add Todo
          </button>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <ul>
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex justify-between items-center py-4 border-b border-gray-200"
            >
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="h-5 w-5 text-red-500 border border-gray-300 rounded focus:ring-red-500"
                  checked={todo.completed}
                  onChange={() => handleToggleComplete(todo.id)}
                />

                {editingId === todo.id ? (
                  <input
                    type="text"
                    className="w-full py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors duration-300"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                  />
                ) : (
                  <span
                    className={`font-semibold ${
                      todo.completed ? "text-red-500" : "text-gray-900"
                    }`}
                  >
                    {todo.task}
                  </span>
                )}
              </div>
              <div>
                {editingId === todo.id ? (
                  <div className="flex items-center space-x-2">
                    <button
                      className="bg-green-500 hover:bg-green-600 focus:outline-none focus:bg-green-600 text-white py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105"
                      onClick={() => handleSaveEdit(todo.id)}
                    >
                      Save
                    </button>
                    <button
                      className="bg-gray-200 hover:bg-gray-300 focus:outline-none focus:bg-gray-300 text-gray-700 py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105"
                      onClick={() => setEditingId(null)}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <button
                      className="bg-gray-200 hover:bg-gray-300 focus:outline-none focus:bg-gray-300 text-gray-700 py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105"
                      onClick={() => handleEditTodo(todo.id, todo.task)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-600 focus:outline-none focus:bg-red-600 text-white py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105"
                      onClick={() => handleRemoveTodo(todo.id)}
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
        <div className="text-right text-gray-500">
          Remaining tasks: {remainingTasks}
        </div>
      </div>
    </div>
  );
}

export default App;
