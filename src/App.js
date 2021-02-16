import { useState } from "react";

import { nanoid } from "nanoid";
import { DragDropContext } from "react-beautiful-dnd";
import Header from "./components/Header";
import AddTaskInput from "./components/AddTaskInput";
import OrderedList from "./components/OrderedList";
import FilterButton from "./components/FilterButton";

const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
};
const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {
  const tasksFromLocalStorage = localStorage.getItem("tasks");
  const [data, updateData] = useState(
    tasksFromLocalStorage ? JSON.parse(tasksFromLocalStorage) : props.DATA
  );
  const [filter, setFilter] = useState("All");

  const orderedListDndContext = data.columns["columnOne"];
  const allTasks = orderedListDndContext.taskIds.map((taskId) => {
    return data.tasks[taskId];
  });
  const activeTasks = allTasks.filter(FILTER_MAP["Active"]);
  const completedTasks = allTasks.filter(FILTER_MAP["Completed"]);
  const filteredTasksByButton = allTasks.filter(FILTER_MAP[filter]);

  const orderedList = (
    <OrderedList
      deleteTask={deleteTask}
      toggleTaskCompleted={toggleTaskCompleted}
      key={orderedListDndContext.id}
      column={orderedListDndContext}
      tasks={filteredTasksByButton}
      filter={filter}
    />
  );

  const filterList = FILTER_NAMES.map((filterName) => {
    return (
      <FilterButton
        key={filterName}
        name={filterName}
        isPressed={filterName === filter}
        setFilter={setFilter}
      />
    );
  });

  // ADD TASK
  function addTask(name) {
    const uniqueId = `task-${nanoid()}`;
    const taskNew = {
      id: `${uniqueId}`,
      name: name,
      completed: false,
    };

    const obj = {
      taskIds: [...data.columns.columnOne.taskIds, uniqueId],
    };
    const newState = {
      ...data,
      tasks: {
        ...data.tasks,
        [uniqueId]: taskNew,
      },
      columns: {
        columnOne: { ...data.columns.columnOne, ...obj },
      },
    };
    updateData(newState);
    localStorage.setItem("tasks", JSON.stringify(newState));
    setFilter("All");
  }

  // DELETE TASK
  function deleteTask(id) {
    const tasksObjects = data.tasks;
    delete tasksObjects[id];

    const arrayOfTaskIds = data.columns.columnOne.taskIds.filter(
      (task) => task !== id
    );
    const obj = {
      taskIds: arrayOfTaskIds,
    };
    const newState = {
      ...data,
      tasks: tasksObjects,
      columns: {
        columnOne: { ...data.columns.columnOne, ...obj },
      },
    };
    updateData(newState);
    localStorage.setItem("tasks", JSON.stringify(newState));
  }

  // Toggle Task Completed
  function toggleTaskCompleted(id) {
    const updatedTasks = allTasks
      .map((task) => {
        if (id === task.id) {
          return { ...task, completed: !task.completed };
        }
      })
      .filter((task) => task);

    const newState = {
      ...data,
      tasks: {
        ...data.tasks,
        [id]: updatedTasks[0],
      },
    };

    updateData(newState);
    localStorage.setItem("tasks", JSON.stringify(newState));
  }

  function clearCompleted() {
    const tasksObjects = data.tasks;
    const taskIdsArray = data.columns.columnOne.taskIds;
    const completedTasksIdsArray = completedTasks.map((task) => task.id);
    const filteredTaskIds = taskIdsArray.filter(
      (item) => !completedTasksIdsArray.includes(item)
    );
    completedTasks.map((task) => {
      delete tasksObjects[task.id];
    });
    const taskIds = {
      taskIds: filteredTaskIds,
    };
    const newState = {
      ...data,
      tasks: tasksObjects,
      columns: {
        columnOne: { ...data.columns.columnOne, ...taskIds },
      },
    };
    updateData(newState);
    localStorage.setItem("tasks", JSON.stringify(newState));
  }

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    const column = data.columns[source.droppableId];
    const newTaskIds = Array.from(column.taskIds);
    newTaskIds.splice(source.index, 1);
    newTaskIds.splice(destination.index, 0, draggableId);
    const newColumn = {
      ...column,
      taskIds: newTaskIds,
    };
    const newState = {
      ...data,
      columns: {
        ...data.columns,
        [newColumn.id]: newColumn,
      },
    };

    updateData(newState);
    localStorage.setItem("tasks", JSON.stringify(newState));
  };

  return (
    <>
      <div className="background-img" />
      <div className="app-wrapper">
        <Header />
        <AddTaskInput addTask={addTask} />
        <DragDropContext onDragEnd={onDragEnd}>{orderedList}</DragDropContext>
        <div className="filter-buttons box">
          <div className="filter-buttons__items-left">
            {activeTasks.length} items left
          </div>

          <div className="filter-buttons__mid-buttons-wrapper" id="lukas">
            {filterList}
          </div>

          <div onClick={clearCompleted}>
            <button
              aria-label="clear completed tasks"
              type="button"
              className="filter-buttons__clear-completed"
            >
              Clear completed
            </button>
          </div>
        </div>
        <div className="box filter-buttons-mobile">
          <div>{filterList}</div>
        </div>

        {filter === "All" ? (
          <p className="dnd-to-reorder dnd-to-reorder--mobile">
            Drag and drop to reorder list
          </p>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default App;
