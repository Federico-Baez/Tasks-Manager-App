import React, { useState, useEffect } from 'react';
import TaskFormik from '../pure/forms/taskFormik';
import TaskComponent from '../pure/task';
import { readLocalStorage, setLocalStorage } from '../../localStorage';

//style
import '../../styles/task_list.scss';
//style for dark mode
import '../../styles/darkMode.scss';

const TaskListComponent = () => {
    /*     const defaultTask1 = new Task("Example1", "Description1", true, Levels.Normal);
        const defaultTask2 = new Task("Example2", "Description2", false, Levels.Urgent);
        const defaultTask3 = new Task("Example3", "Description3", false, Levels.Blocking); */

    //component states
    const [tasks, setTasks] = useState(() => readLocalStorage("todos") || []);
    const [loading, setLoading] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(true);

    //life cycle of the component
    useEffect(() => {
        console.log("Task state have been modified");
        setTimeout(() => {
            setLoading(false);
        }, 800)
        return () => {
            console.log("TaskList component is going to unmount");
        };
    }, [tasks]);

    //useEffect for the app bg depending on the light/dark mode
    useEffect(() => {
        const rootElement = document.querySelector(':root');
        if (isDarkMode) {
            rootElement.style.setProperty('--background-color', '#272b2f'); // Set the dark mode background color#2d2d2d
        } else {
            rootElement.style.setProperty('--background-color', 'rgb(229, 226, 215)'); // Set the light mode background color
        }
    }, [isDarkMode]);

    function completeTask(task) {
        const index = tasks.indexOf(task);
        const tempTasks = [...tasks];
        tempTasks[index].completed = !tempTasks[index].completed;
        /* We update the state of the component with the new list of tasks and it will update the iteration of the tasks in order to show the tasks updated */
        setTasks(tempTasks);
        setLocalStorage("todos", tempTasks);
    }

    function deleteTask(task) {
        const index = tasks.indexOf(task);
        const tempTasks = [...tasks];
        tempTasks.splice(index, 1);
        setTasks(tempTasks);
        setLocalStorage("todos", tempTasks);
    }

    function addTask(task) {
        const tempTasks = [...tasks];
        tempTasks.push(task);
        setTasks(tempTasks);
        setLocalStorage("todos", tempTasks);
    }

    const Table = () => {
        return (
            <table>
                <thead>
                    <tr>
                        <th className='tbl_th' scope='col'>Title</th>
                        <th className='tbl_th' scope='col'>Description</th>
                        <th className='tbl_th' scope='col'>Priority</th>
                        <th className='tbl_th' scope='col'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((taskIt, index) => {
                        return (<TaskComponent
                            key={index}
                            task={taskIt}
                            complete={completeTask}
                            remove={deleteTask}
                            darkMode={isDarkMode}
                        >
                        </TaskComponent>)
                    })}
                </tbody>
            </table>
        );
    };

    let taskTable;

    if (tasks.length > 0) {
        taskTable = <Table></Table>;
    } else {
        taskTable = (
            <div>
                <h4>There are no todos pending</h4>
                <p>Please, create one</p>
            </div>)
    }

    function handleDarkMode() {
        setIsDarkMode(!isDarkMode);
    }


    const loadingStyle = {
        color: "grey",
        fontSize: "1rem",
        fontWeigth: "bold",
    }


    return (
        <div className={isDarkMode ? "dark-mode" : ""}>
            <div className='col-12'>
                <div className={isDarkMode ? 'card text-bg-dark border-none text-light d-flex' : 'card d-flex'} style={{ fontSize: '.95rem' }}>
                    {/* Card Header (Title) */}
                    <div className='card-header p-3 d-flex justify-content-center listHeader'>
                        <h1 className='title mb-0' style={{ fontSize: '2.1rem' }}>Your Todos</h1>
                        {/* Dark/Light mode button */}
                        <button className="btn" onClick={handleDarkMode}>
                            {isDarkMode ?
                                <i className="bi bi-brightness-high-fill lightModeIcon"></i>
                                :
                                <i className="bi bi-moon-fill darkModeIcon"></i>}
                        </button>
                    </div>
                    {/* Card Body (Content) */}
                    <div className='card-body' data-mdv-perfect-scrollbar='true' style={{ position: 'relative', height: '400px' }}>
                        {loading ? (<div style={loadingStyle} className="spinner-border" role="status"><span className="visually-hidden">Loading todos...</span></div>) : taskTable}
                    </div>
                </div>
                <TaskFormik add={addTask} lenght={tasks.length} darkMode={isDarkMode} ></TaskFormik>
            </div>
        </div>
    );
};


export default TaskListComponent;
