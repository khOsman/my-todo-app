import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // State to hold the current task input
  const [task, setTask] = useState('');
  // State to hold the list of tasks
  const [tasks, setTasks] = useState([]);

  // useEffect to load tasks from localStorage when the component mounts
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  // Function to add a new task
  const addTask = () => {
    if (task.trim()) {
      // Create a new task and add it to the existing tasks
      const newTasks = [...tasks, { text: task, status: 'Not Started' }];
      // Update the tasks state with the new list
      setTasks(newTasks);
      // Clear the task input
      setTask('');
      // Save the new list of tasks to localStorage
      localStorage.setItem('tasks', JSON.stringify(newTasks));
    }
  };

  // Function to update the status of a task
  const updateStatus = (index, status) => {
    // Copy the existing tasks
    const newTasks = [...tasks];
    // Update the status of the task at the specified index
    newTasks[index].status = status;
    // Update the tasks state with the modified list
    setTasks(newTasks);
    // Save the modified list of tasks to localStorage
    localStorage.setItem('tasks', JSON.stringify(newTasks));
  };

  // Function to delete a task
  const deleteTask = (index) => {
    // Filter out the task at the specified index
    const newTasks = tasks.filter((_, i) => i !== index);
    // Update the tasks state with the modified list
    setTasks(newTasks);
    // Save the modified list of tasks to localStorage
    localStorage.setItem('tasks', JSON.stringify(newTasks));
  };

  return (
    <div className="app">
      <h1>To-Do App</h1>
      <div className="input-container">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter a task"
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <ul className="task-list">
        {tasks.map((task, index) => (
          <li key={index} className="task-item">
            <span className="task-text">{index+1}. {task.text}</span>
            <div className="status-buttons">
              <label>
                <input
                  type="radio"
                  name={`status-${index}`}
                  checked={task.status === 'Not Started'}
                  onChange={() => updateStatus(index, 'Not Started')}
                />
                Not Started
              </label>
              <label>
                <input
                  type="radio"
                  name={`status-${index}`}
                  checked={task.status === 'In Progress'}
                  onChange={() => updateStatus(index, 'In Progress')}
                />
                In Progress
              </label>
              <label>
                <input
                  type="radio"
                  name={`status-${index}`}
                  checked={task.status === 'Done'}
                  onChange={() => updateStatus(index, 'Done')}
                />
                Done
              </label>
            </div>
            <button className="delete-button" onClick={() => deleteTask(index)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
