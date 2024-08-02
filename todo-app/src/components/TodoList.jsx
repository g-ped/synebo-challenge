import { useEffect, useState } from "react";

function TodoList({ theme, todos, setTodos }) {
  const [isMobile, setIsMobile] = useState(false);
  const [filter, setFilter] = useState("all-filter");
  const [filteredTodos, setFilteredTodos] = useState(todos);

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

  useEffect(() => {
    const handleFilter = () => {
      switch (filter) {
        case "all-filter":
          return todos;
        case "active-filter":
          return todos.filter((todo) => !todo.isCompleted);
        case "completed-filter":
          return todos.filter((todo) => todo.isCompleted);
        default:
          return todos;
      }
    };

    setFilteredTodos(handleFilter());
  }, [filter, todos, setFilteredTodos]);

  const handleComplete = (index) => {
    const newTodos = [...filteredTodos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  };

  const handleDelete = (index) => {
    const newTodos = [...filteredTodos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const handleClearCompleted = () => {
    const newTodos = filteredTodos.filter((todo) => !todo.isCompleted);
    setTodos(newTodos);
  };

  const handleDragStart = (event, index) => {
    event.dataTransfer.setData("text/plain", index);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event, index) => {
    event.preventDefault();
    const draggedIndex = parseInt(event.dataTransfer.getData("text/plain"));

    if (draggedIndex !== index) {
      const newTodoItems = [...filteredTodos];
      const [removedItem] = newTodoItems.splice(draggedIndex, 1);
      newTodoItems.splice(index, 0, removedItem);
      setFilteredTodos(newTodoItems);
    }
  };

  return (
    <>
      <ul className="todo-list">
        {filteredTodos.map((todo, index) => (
          <li
            key={index}
            draggable="true"
            onDragStart={(event) => handleDragStart(event, index)}
            onDragOver={handleDragOver}
            onDrop={(event) => handleDrop(event, index)}
            className={`todo-item ${todo.isCompleted ? "completed" : ""}`}
          >
            <div
              className={`custom-checkbox ${
                todo.isCompleted ? "completed" : ""
              }`}
              onClick={() => handleComplete(index)}
            >
              {todo.isCompleted && <span className="icon-check"></span>}
            </div>
            <p>{todo.text}</p>
            <button
              className="delete-button"
              onClick={() => handleDelete(index)}
              style={{ opacity: isMobile ? "1" : "0" }}
            >
              <div alt="remove-todo" className="icon-cross" />
            </button>
          </li>
        ))}
        <li className="todo-list-footer">
          <p>{todos.filter((todo) => !todo.isCompleted).length} items left</p>
          {!isMobile && (
            <div className="todo-list-footer-filters">
              <button
                className={`${filter === "all-filter" ? "current-filter" : ""}`}
                onClick={() => setFilter("all-filter")}
              >
                All
              </button>
              <button
                className={`${
                  filter === "active-filter" ? "current-filter" : ""
                }`}
                onClick={() => setFilter("active-filter")}
              >
                Active
              </button>
              <button
                className={`${
                  filter === "completed-filter" ? "current-filter" : ""
                }`}
                onClick={() => setFilter("completed-filter")}
              >
                Completed
              </button>
            </div>
          )}
          <button onClick={handleClearCompleted}>Clear completed</button>
        </li>
      </ul>

      {isMobile && (
        <div className="todo-list-mobile-filters">
          <button
            className={`${filter === "all-filter" ? "current-filter" : ""}`}
            onClick={() => setFilter("all-filter")}
          >
            All
          </button>
          <button
            className={`${filter === "active-filter" ? "current-filter" : ""}`}
            onClick={() => setFilter("active-filter")}
          >
            Active
          </button>
          <button
            className={`${
              filter === "completed-filter" ? "current-filter" : ""
            }`}
            onClick={() => setFilter("completed-filter")}
          >
            Completed
          </button>
        </div>
      )}
    </>
  );
}

export default TodoList;
