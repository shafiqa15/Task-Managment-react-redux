import React, { useState, useMemo, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { addTask, removeTask } from './Actions/taskActions';
import { toggleTheme } from './Actions/themeActions';
import { selectSortedTasks } from './selectors/taskSelectors';
import { selectDarkMode } from './selectors/themeSelectors';
import TaskList from './Components/TaskList';
import './App.css';

function App() {
  const [task, setTask] = useState('');
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const tasks = useSelector(selectSortedTasks);
  const darkMode = useSelector(selectDarkMode);

  const sortedTasks = useMemo(() => tasks, [tasks]);
  const themeClass = useMemo(() => (darkMode ? 'dark' : ''), [darkMode]);

  const modalRef = useRef(null);

  const handleAddTask = useCallback(() => {
    if (task) {
      dispatch(addTask({ id: Date.now(), text: task }));
      setTask('');
      setShowModal(false);
    }
  }, [task, dispatch]);

  const handleToggleModal = () => setShowModal(!showModal);

  return (
    <HelmetProvider>
      <Helmet>
        {/* Google Tag Manager Script */}
        {/* //G-2599QDZ2LR */}
        <script>
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-MC7F6PF5');
          `}
        </script>
      </Helmet>

      <div className={`App ${themeClass}`}>
        <h1>Smart Task Manager</h1>
        <button className="modal-btn" onClick={handleToggleModal}>
          Add Task
        </button>

        {showModal && (
          <div className="modal show" ref={modalRef}>
            <div className="modal-content">
              <h2>Add a New Task</h2>
              <input
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="Task name"
              />
             {/* this className 'clickbut' is for GA4  ,TAGS BY CLASSNAME EVENT*/}
              <button onClick={handleAddTask} className='clickbut'>Add Task</button>
              <button className="remove" onClick={handleToggleModal}>Close</button>
            </div>
          </div>
        )}

        <button onClick={() => dispatch(toggleTheme())}>Toggle Theme</button>
        <TaskList tasks={sortedTasks} removeTask={removeTask} />
      </div>
    </HelmetProvider>
  );
}

export default App;
