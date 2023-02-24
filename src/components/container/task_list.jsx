import React, {useState, useEffect} from 'react';
import { Levels } from '../../models/levels.enum';
import { Task } from '../../models/task.class';
import TaskForm from '../pure/forms/taskForm';
import TaskComponent from '../pure/task';

const TaskListComponent = () => {
    const defaultTask1 = new Task("Example1", "Description1", true, Levels.Normal);
    const defaultTask2 = new Task("Example2", "Description2", false, Levels.Urgent);
    const defaultTask3 = new Task("Example3", "Description3", false, Levels.Blocking);
    
    //estado del componente
    const [tasks, setTasks] = useState([defaultTask1, defaultTask2, defaultTask3]);
    const [loading, setLoading] = useState(true);

    //ciclo de vida del componente
    useEffect(() => {
        console.log("Task state have been modified");
        setLoading(false);
        return () => {
            console.log("TaskList cpmponent is going to unmount");
        };
    }, [tasks]);

    /* const changeCompleted = (id) =>{
        console.log("TODO: cambiar de estado una tarea")
    } */

    return (
        <div>
            <div className='col-12'>
                <div className='card' style={{fontSize:'1.2rem'}}>
                    {/* Card Header (Title) */}
                    <div className='card-header p-3'>
                        <h1>Your tasks</h1>
                    </div>
                    {/* Card Body (Content) */}
                    <div className='card-body' data-mdv-perfect-scrollbar='true' style={{position:'relative', height:'400px'}}>
                        <table>
                            <thead>
                                <tr>
                                    <th scope='col'>Title</th>
                                    <th scope='col'>Description</th>
                                    <th scope='col'>Priority</th>
                                    <th scope='col'>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tasks.map((taskIt, index)=>{
                                    return(<TaskComponent key={index} task={taskIt}></TaskComponent>)
                                })}
                            </tbody>
                        </table>
                    </div>        
                </div>
                <TaskForm></TaskForm>
            </div>
        </div>
    );
};


export default TaskListComponent;
