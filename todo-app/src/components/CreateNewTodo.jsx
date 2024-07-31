import React, { useState, useRef } from "react";

function CreateNewTodo({ theme, todos, submitTodo }) {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && inputValue !== "") {
      event.preventDefault();
      submitTodo([...todos, { text: inputValue, isCompleted: false }]);
      setInputValue("");
    }
  };

  return (
    <div className="create-new-todo">
      <input type="radio" name="create-radio" id="create-radio" disabled />
      <input
        className="create-input"
        type="text"
        placeholder="Create a new todo..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        ref={inputRef}
      />
    </div>
  );
}

export default CreateNewTodo;
