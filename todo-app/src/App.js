import "./styles.css";
import { useState } from "react";
import Header from "./components/Header";
import CreateNewTodo from "./components/CreateNewTodo";
import TodoList from "./components/TodoList";

function App() {
  const [theme, setTheme] = useState("dark");
  const [todos, setTodos] = useState([]);

  return (
    <div className="todo-app">
      <div className="main-container">
        <Header theme={theme} setTheme={setTheme} />
        <CreateNewTodo theme={theme} todos={todos} submitTodo={setTodos} />
        <TodoList theme={theme} todos={todos} setTodos={setTodos} />
        <h3 className="drag-drop-note">Drag and drop to reorder list</h3>
      </div>
    </div>
  );
}

export default App;
