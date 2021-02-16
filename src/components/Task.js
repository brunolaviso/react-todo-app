import { Draggable } from "react-beautiful-dnd";

function Task(props) {
  function deleteTodo() {
    props.deleteTask(props.id);
  }

  const iconChecked = (
    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="9">
      <path
        fill="none"
        stroke="#FFF"
        strokeWidth="2"
        d="M1 4.304L3.696 7l6-6"
      />
    </svg>
  );
  const iconCross = (
    <button
      onClick={deleteTodo}
      aria-label="Delete task"
      className="icon-cross"
      type="button"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18">
        <path
          fill="#494C6B"
          fillRule="evenodd"
          d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"
        />
      </svg>
    </button>
  );

  const filterIsSetToAll = (
    <Draggable draggableId={props.task.id} index={props.index}>
      {(provided) => (
        <li
          className="box todo-item"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <button
            aria-label={
              props.isCompleted ? "uncheck task" : "check task as completed"
            }
            onClick={() => props.toggleTaskCompleted(props.id)}
            className={`checkbox ${
              props.isCompleted ? "todo-item__checked" : ""
            }`}
          >
            {props.isCompleted ? iconChecked : ""}
          </button>
          <span
            onClick={() => props.toggleTaskCompleted(props.id)}
            className={`todo-item__task-name ${
              props.isCompleted ? "todo-item__striked" : ""
            }`}
          >
            {props.task.name}
          </span>
          {iconCross}
        </li>
      )}
    </Draggable>
  );

  const filterOtherThanAll = (
    <li className="box todo-item">
      <button
        aria-label={
          props.isCompleted ? "uncheck task" : "check task as completed"
        }
        onClick={() => props.toggleTaskCompleted(props.id)}
        className={`checkbox ${props.isCompleted ? "todo-item__checked" : ""}`}
      >
        {props.isCompleted ? iconChecked : ""}
      </button>
      <span
        onClick={() => props.toggleTaskCompleted(props.id)}
        className={`todo-item__task-name ${
          props.isCompleted ? "todo-item__striked" : ""
        }`}
      >
        {props.task.name}
      </span>
      {iconCross}
    </li>
  );
  return props.filter === "All" ? filterIsSetToAll : filterOtherThanAll;
}

export default Task;
