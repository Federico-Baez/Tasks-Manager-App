import React from 'react';
import { useParams } from 'react-router-dom';

const TaskDetailPage = ({ tasks }) => {
    const { id } = useParams();
    console.log(id)
    console.log(typeof(id))
    const task = tasks.find(task => task.id == id);

    if(!task) return null

    return (
        <div>
            <h1> Task detail - {id}</h1>
            <h2>{task.name}</h2>
            <h2>{task.description}</h2>
        </div>
    );
}

export default TaskDetailPage;
