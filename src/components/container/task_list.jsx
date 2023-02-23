import React from 'react';
import { Levels } from '../../models/levels.enum';
import { Task } from '../../models/task.class';
import TaskComponent from '../pure/task';

const TaskListComponent = () => {

    const defaultTask = new Task("example", "default description", false, Levels.Normal);

    const changeState = (id) =>{
        console.log("TODO: cambiar de estado una tarea")
    }

    return (
        <div>
            <div>
                <h1>Your task:</h1>
            </div>
            {/* TODO: aplicar un for/map para renderizar una lista  */}  
            <TaskComponent task={defaultTask}></TaskComponent> 
        </div>
    );
};


export default TaskListComponent;
