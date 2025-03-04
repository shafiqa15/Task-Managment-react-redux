
import React, { useState, useMemo, useCallback,useRef} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { addTask,removeTask } from './Actions/taskActions';
import { toggleTheme } from './Actions/themeActions';
import { selectSortedTasks } from './selectors/taskSelectors';
import { selectDarkMode } from './selectors/themeSelectors';
import TaskList from './Components/TaskList';
import './App.css';

function App() {
  const [task, setTask] = useState('');
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  // Select tasks and theme using useSelector
  const tasks = useSelector(selectSortedTasks);
  const darkMode = useSelector(selectDarkMode);

  // Memoize the sorted tasks
  const sortedTasks = useMemo(() => {
    return tasks; // Memoizing the tasks to avoid recalculating on each render
  }, [tasks]);  // Only re-calculate when tasks change

  // Memoize the dark mode value
  const themeClass = useMemo(() => {
    return darkMode ? 'dark' : ''; // Memoizing the theme class
  }, [darkMode]); // Recalculate only when darkMode changes

  const modalRef = useRef(null);  // Modal reference

  const handleAddTask = useCallback(() => {
    if (task) {
      dispatch(addTask({ id: Date.now(), text: task }));
      setTask('');
      setShowModal(false);  // Close modal after adding task
    }
  }, [task, dispatch]);

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };
  

  return (
    <div className={`App ${themeClass}`}>
      <h1>Smart Task Manager</h1>
      <button className="modal-btn" onClick={handleToggleModal}>
        Add Task
      </button>

      {/* Modal for Adding Task */}
      {showModal && (
        <div className="modal show" ref={modalRef}>
          <div className="modal-content">
            <h2>Add a New Task</h2>
            <input
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder="Task name"
            />
            <button onClick={handleAddTask}>Add Task</button>
            <button className="remove" onClick={handleToggleModal}>Close</button>
          </div>
        </div>
      )}

      <button onClick={() => dispatch(toggleTheme())}>Toggle Theme</button>
      <TaskList tasks={sortedTasks} removeTask={removeTask} />
    </div>
  );
}



export default App;




