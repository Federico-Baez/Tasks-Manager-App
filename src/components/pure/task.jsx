import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import { Task } from '../../models/task.class';
import { Levels } from "../../models/levels.enum";
import '../../styles/task_list.scss'

//style
import '../../styles/task.scss'


const TaskComponent = ({ task, complete, remove }) => {

     useEffect(() => {
          console.log("Created task");
          return () => {
               console.log(`Task: ${task.name} is going to unmount`);
          };
     }, [task]);

     /* Function that returns a badge depending on the level of the task */
     function taskLevelBadge(){
          switch(task.level){
               case Levels.Normal:
                    return(
                    <h6 className='mb-0'>
                         <span className='badge bg-primary'>
                              {task.level}
                         </span>
                    </h6>
                    )
               case Levels.Urgent:
                    return(
                    <h6 className='mb-0'>
                         <span className='badge bg-warning'>
                              {task.level}
                         </span>
                    </h6>
                    )
               case Levels.Blocking:
                    return(
                    <h6 className='mb-0'>
                         <span className='badge bg-danger'>
                              {task.level}
                         </span>
                    </h6>
                    )
               default:
                    break;
          }
     }
     /* Function that returns an icon depending on the completion state of the task */
     function taskCompletedIcon(){
          if(task.completed){
               return (<i onClick={()=>complete(task)} className='bi-toggle-on task-icon' style={{color:'green', fontSize:'1.2rem'}}></i>)
          }else{
               return(<i onClick={()=>complete(task)} className='bi-toggle-off task-icon' style={{color:'grey',fontSize:'1.2rem'}}></i>)
          }
     }

    return (

          <tr className='fw-normal'>
               <th>
                    <span className='ms-2'>{ task.name }</span>
               </th>
               <td className='align-center'>
                    <span className='ms-2'>{ task.description }</span>
               </td>
               <td className='align-center'>
                    {/* fuction -> badge segun task priority*/}
                    {taskLevelBadge()}
               </td>
               <td className='align-center'>
                    {taskCompletedIcon()}
                    <i onClick={()=>remove(task)} className='bi-trash ms-3 task-icon' style={{color:'grey',fontSize:'1.2rem'}}></i>
               </td>
          </tr>
    );
};


TaskComponent.propTypes = {
    task: PropTypes.instanceOf(Task).isRequired,
    complete: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
};


export default TaskComponent;
