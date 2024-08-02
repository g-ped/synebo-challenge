import "./styles.css";
import { useState } from "react";
import Header from "./components/Header";
import CreateNewTodo from "./components/CreateNewTodo";
import TodoList from "./components/TodoList";

function App() {
  const [theme, setTheme] = useState("light");
  const [todos, setTodos] = useState([]);

  return (
    <div className={`todo-app ${theme}`}>
      <div className="main-container">
        <Header theme={theme} setTheme={setTheme} />
        <CreateNewTodo todos={todos} submitTodo={setTodos} />
        <TodoList todos={todos} setTodos={setTodos} />
        <h3 className="drag-drop-note">Drag and drop to reorder list</h3>
      </div>
    </div>
  );
}

export default App;
