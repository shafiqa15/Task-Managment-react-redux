import React, { Component } from 'react';
import { useDispatch } from 'react-redux';
import { removeTask } from '../Actions/taskActions';
import { useMemo } from 'react';
const TaskList = ({ tasks }) => {
    const dispatch = useDispatch();
  
    // Memoize the list of tasks to prevent unnecessary re-renders
    const memoizedTasks = useMemo(() => tasks, [tasks]);
  
    return (
      <ul>
        {memoizedTasks.map((task) => (
          <li key={task.id}>
            {task.text}
            <button onClick={() => dispatch(removeTask(task.id))} className="remove">
              Remove
            </button>
          </li>
        ))}
      </ul>
    );
  };
  
  export default TaskList;