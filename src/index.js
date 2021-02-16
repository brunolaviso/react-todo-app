import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const DATA = {
  tasks: {
    "task-1": {
      id: "task-1",
      name: "Watch my favorite show",
      completed: true,
    },
    "task-2": {
      id: "task-2",
      name: "Take out the garbage",
      completed: true,
    },
    // "task-3": { id: "task-3", name: "Charge my phone", completed: true },
    "task-4": { id: "task-4", name: "Cook dinner", completed: false },
  },

  columns: {
    columnOne: {
      id: "columnOne",
      title: "To do",
      taskIds: ["task-1", "task-2", "task-4"],
    },
  },
  // Facilitate reordering of the columns
  columnOrder: ["columnOne"],
};

ReactDOM.render(
  <React.StrictMode>
    <App DATA={DATA} />
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
