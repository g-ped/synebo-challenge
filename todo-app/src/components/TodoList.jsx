import { useEffect, useState } from "react";

function TodoList({ theme, todos, setTodos }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 560);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleComplete = (index) => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  };

  const handleDelete = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const handleClearCompleted = () => {
    const newTodos = todos.filter((todo) => !todo.isCompleted);
    setTodos(newTodos);
  };

  return (
    <>
      <ul className="todo-list">
        {todos.map((todo, index) => (
          <li
            key={index}
            className={`todo-item ${todo.isCompleted ? "completed" : ""}`}
          >
            <input
              className="todo-item-checkbox"
              type="radio"
              onClick={() => handleComplete(index)}
              checked={todo.isCompleted}
            />
            <p>{todo.text}</p>
            <button
              className="delete-button"
              onClick={() => handleDelete(index)}
              style={{ opacity: isMobile ? "1" : "0" }}
            >
              <img src="/icon-cross.svg" alt="remove-todo" />
            </button>
          </li>
        ))}
        <li className="todo-list-footer">
          <p>{todos.filter((todo) => !todo.isCompleted).length} items left</p>
          {!isMobile && (
            <div className="todo-list-footer-filters">
              <button className="all-filter">All</button>
              <button className="active-filter">Active</button>
              <button className="completed-filter">Completed</button>
            </div>
          )}
          <button onClick={handleClearCompleted}>Clear completed</button>
        </li>
      </ul>

      {isMobile && (
        <div className="todo-list-mobile-filters">
          <button className="all-filter">All</button>
          <button className="active-filter">Active</button>
          <button className="completed-filter">Completed</button>
        </div>
      )}
    </>
  );
}

export default TodoList;
