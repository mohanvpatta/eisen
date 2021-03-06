import React from "react";

const Input = ({
  cells,
  tasks,
  setTasks,
  inputRef,
  taskTarget,
  setTaskTarget,
}) => {
  const randID = (length) => {
    return [...Array(length)]
      .map((_) => ((Math.random() * 36) | 0).toString(36))
      .join(``)
      .toUpperCase();
  };

  const handleInput = (e) => {
    if (e.key !== "Enter") return;
    if (e.target.value === "") return;

    const contentPipe = [];
    const tasksPipe = [];

    if (e.target.value.includes("||")) {
      e.target.value.split("||").forEach((task) => {
        contentPipe.push(task);
      });
    } else {
      contentPipe.push(e.target.value);
    }

    contentPipe.forEach((content) => {
      tasksPipe.push({
        id: randID(6),
        content: content.trim(),
        done: false,
      });
    });

    const updatedTasks = JSON.parse(JSON.stringify(tasks));

    for (let cell in updatedTasks) {
      if (cell === taskTarget) {
        tasksPipe.forEach((task) => {
          updatedTasks[cell].push(task);
        });
      }
    }

    setTasks(updatedTasks);

    e.target.value = "";
    setTaskTarget("");
  };

  const handleInputBlur = (e) => {
    e.target.value = "";
    setTaskTarget("");
  };

  const genPlaceholder = () => {
    const placeholder = cells.find((data) => data.type === taskTarget).title;
    return `@${placeholder.toLowerCase().replaceAll(" ", "-")}`;
  };

  return (
    <div id="input-container">
      <input
        autoFocus
        id="task-input"
        type="text"
        spellCheck="false"
        autoComplete="chrome-off"
        ref={inputRef}
        placeholder={genPlaceholder()}
        onKeyPress={handleInput}
        onBlur={handleInputBlur}
      />
    </div>
  );
};

export default Input;
