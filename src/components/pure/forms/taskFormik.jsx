import React, {useRef} from 'react';
import PropTypes from 'prop-types';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Levels } from '../../../models/levels.enum';
import { Task } from '../../../models/task.class';

/* 
--Partiendo del proyecto final, deberéis utilizar crear un formulario con el que crear tareas.  Para hacer esto usaréis:
    -Formik para el formulario.
    -Yup para las validaciones.
*/

const TaskFormik = ({ add, lenght }) => {

    const initialTaskCredential = {
        name: '',
        description: '',
        completed: false,
        level: Levels.Normal,
    }

    const taskFormSchema = Yup.object().shape(
        {
            name: Yup.string()
                    .required('Name is a required field'),
            description: Yup.string()
                    .required('Description is a required field'),
        }
    )

    return (
        <Formik
            // Initial values for the form
            initialValues = { initialTaskCredential }
            // Yup validation schema
            validationSchema = { taskFormSchema }
            
            // onSubmit event
            onSubmit={(values) => {
                const newTask = new Task(values.name, values.description, false, values.level);
                add(newTask);
            }}
        >

        {({ errors, touched })=>(
            <Form>
                <Field className='form-control mt-2' id="name" name="name" placeholder="Task name" type="text"/>
                {/* email errors */}
                {errors.name && touched.name && (<ErrorMessage name="name" component="div" />)}

                <Field className='form-control mt-2' id="description" name="description" placeholder="Task description" type="text"/>
                {/* password errors */}
                {errors.description && touched.description && (<ErrorMessage name="description" component="div" />)}
                
                <div className='d-flex mt-2'>
                <label htmlFor="level" className='sr-only align-self-center me-3'>Priority</label>
                    <Field className='form-select' as="select" name="level" id="level" defaultValue={Levels.Normal}>
                        <option value={Levels.Normal}>Normal</option>
                        <option value={Levels.Urgent}>Urgent</option>
                        <option value={Levels.Blocking}>Blocking</option>
                    </Field>
                </div>
                <button className='btn btn-primary w-100 mt-2' type="submit">
                    {lenght > 0 ? "Add Task": "Create Your First Task"}
                </button>
            </Form>
        )}      
        </Formik>
    );
}

TaskFormik.propTypes = {
    add: PropTypes.func.isRequired,
    lenght: PropTypes.number.isRequired,
};

export default TaskFormik;
