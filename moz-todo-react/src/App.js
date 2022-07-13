import { nanoid } from 'nanoid';
import React, { useState } from 'react';
import Form from './components/Form';
import FilterButton from './components/FilterButton';
import Todo from './components/Todo';

const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed
};
const FILTER_NAMES = Object.keys(FILTER_MAP);
console.log(FILTER_NAMES);

function App(props) {
  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState('All');

  // Add a new task
  function addTask(name) {
    const newTask = { id: `todo-${nanoid()}`, name: name, completed: false };
    setTasks([...tasks, newTask]);
  }

  // Mark a task as completed task.
  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map(task => {
      if (id === task.id) {
        return { ...task, completed: !task.completed }
      }
      return task;
    });

    setTasks(updatedTasks);
  }

  // Edit a task
  function editTask(id, newName) {
    const editedTaskList = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, name: newName }
      }
      return task;
    });
    setTasks(editedTaskList);
  }

  // Delete a task
  function deleteTask(id) {
    const remainingTasks = tasks.filter((task) => {
      if (task.id != id) {
        return true;
      }
    });

    setTasks(remainingTasks);
  }

  // Show all tasks
  const taskList = tasks.filter(FILTER_MAP[filter]).map((task) => {
    return (
      <Todo
        id={task.id}
        name={task.name}
        completed={task.completed}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        editTask={editTask}
        deleteTask={deleteTask}
      />
    )
  });

  // Show all filters
  const filterList = FILTER_NAMES.map((name) => {
    return (
      <FilterButton
        key={name}
        name={name}
        isPressed={name === filter}
        setFilter={setFilter}
      />
    );
  });

  const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task';
  const headingText = `${taskList.length} ${tasksNoun} remaining`;

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
        {filterList}
      </div>
      <h2 id="list-heading">
        {headingText}
      </h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  );
}

export default App;
