import React, {useRef} from 'react';
import PropTypes from 'prop-types';
import { Levels } from '../../../models/levels.enum';
import { Task } from '../../../models/task.class';

const TaskForm = ({ add }) => {

    const nameRef = useRef('');
    const descriptionRef = useRef('');
    const levelRef = useRef(Levels.Normal);
    
    function addTask(e){
        e.preventDefault();
        const newTask = new Task(
            nameRef.current.value, 
            descriptionRef.current.value,
            false, 
            levelRef.current.value
        )   
        add(newTask);
    }

    return (
        <form onSubmit={addTask} className='d-flex justify-content-center align-items-center mb-4'>
            <div className='form-outline flex-fill'>
                <input ref={nameRef} id="inputName" type="text" className='form-control mt-2' placeholder='Task name' required autoFocus/>
                <input ref={descriptionRef} id="inputDescription" type="text" className='form-control mt-2' placeholder='Task description' required/>
                <div className='d-flex mt-2'>
                <label htmlFor="selectLevel" className='sr-only align-self-center me-3'>Priority</label>
                    <select ref={levelRef} defaultValue={Levels.Normal} id="selectLevel" className='form-select'>
                        <option value={Levels.Normal}>Normal</option>
                        <option value={Levels.Urgent}>Urgent</option>
                        <option value={Levels.Blocking}>Blocking</option>
                    </select>
                </div>
                <button type="submit" className='btn btn-primary w-100 mt-2'>Add Task</button>
            </div>
            {/* <button type="submit" className='btn btn-primary flex-fill ms-2 mt-2'>Add Task</button> */}
        </form>
    );
}

TaskForm.propTypes = {
    add: PropTypes.func.isRequired,
};

export default TaskForm;
