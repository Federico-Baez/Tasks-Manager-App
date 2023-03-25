import React, { useState, useEffect } from 'react';
import TaskFormik from '../pure/forms/taskFormik';
import TaskComponent from '../pure/task';
import { readLocalStorage, setLocalStorage } from '../../localStorage';

//style
import '../../styles/task_list.scss';

const TaskListComponent = () => {
    /*     const defaultTask1 = new Task("Example1", "Description1", true, Levels.Normal);
        const defaultTask2 = new Task("Example2", "Description2", false, Levels.Urgent);
        const defaultTask3 = new Task("Example3", "Description3", false, Levels.Blocking); */

    //estado del componente
    const [tasks, setTasks] = useState(() => readLocalStorage("todos") || []);
    const [loading, setLoading] = useState(true);

    //ciclo de vida del componente
    useEffect(() => {
        console.log("Task state have been modified");
        setTimeout(() => {
            setLoading(false);
        }, 800)
        return () => {
            console.log("TaskList component is going to unmount");
        };
    }, [tasks]);

    function completeTask(task) {
        const index = tasks.indexOf(task);
        const tempTasks = [...tasks];
        tempTasks[index].completed = !tempTasks[index].completed;
        /* We update the state of the component with the new list of tasks and it will update the iteration of the tasks in order to show the tasks updated */
        setTasks(tempTasks);
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

    const loadingStyle = {
        color: "grey",
        fontSize: "2rem",
        fontWeigth: "bold",

    }

    return (
        <div>
            <div className='col-12'>
                <div className='card' style={{ fontSize: '.95rem' }}>
                    {/* Card Header (Title) */}
                    <div className='card-header p-3 d-flex justify-content-center'>
                        <h1 className='title' style={{ fontSize: '2.1rem' }}>Your Todos</h1>
                    </div>
                    {/* Card Body (Content) */}
                    <div className='card-body' data-mdv-perfect-scrollbar='true' style={{ position: 'relative', height: '400px' }}>
                        {/* TODO: add loading spinner */}
                        {loading ? (<p style={loadingStyle}>Loading todo list...</p>) : taskTable}
                    </div>
                </div>
                <TaskFormik add={addTask} lenght={tasks.length}></TaskFormik>
            </div>
        </div>
    );
};


export default TaskListComponent;
