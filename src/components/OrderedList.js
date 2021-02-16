import { Droppable } from "react-beautiful-dnd";
import Task from "./Task";

function Column(props) {
  return (
    <Droppable droppableId={props.column.id}>
      {(provided) => (
        <ul className="ul" ref={provided.innerRef} {...provided.droppableProps}>
          {props.tasks.map((task, index) => (
            <Task
              deleteTask={props.deleteTask}
              id={task.id}
              toggleTaskCompleted={props.toggleTaskCompleted}
              name={task.name}
              isCompleted={task.completed}
              key={task.id}
              index={index}
              task={task}
              filter={props.filter}
            />
          ))}
          {provided.placeholder}
        </ul>
      )}
    </Droppable>
  );
}

export default Column;
