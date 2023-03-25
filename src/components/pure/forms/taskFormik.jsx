import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Levels } from '../../../models/levels.enum';
import { Task } from '../../../models/task.class';

//style
import '../../../styles/taskFormik.scss';

const TaskFormik = ({ add, lenght, darkMode }) => {

    useEffect(() => {
        // get all error message elements
        const errorMessages = document.getElementsByClassName("error-message");
        // update their style based on the current darkMode value
        for (let i = 0; i < errorMessages.length; i++) {
            errorMessages[i].style.color = darkMode ? "beige" : "black";
        }
    }, [darkMode]);

    const initialTaskCredential = {
        name: '',
        description: '',
        completed: false,
        level: Levels.Normal,
    }

    const taskFormSchema = Yup.object().shape(
        {
            name: Yup.string()
                .min(2, "Too short!")
                .max(16, "Too long!")
                .required('Name is a required field'),
            description: Yup.string()
                .min(2, "Too short!")
                .max(40, "Too long!")
                .required('Description is a required field'),
        }
    )

    return (
        <Formik
            // Initial values for the form
            initialValues={initialTaskCredential}
            // Yup validation schema
            validationSchema={taskFormSchema}

            // onSubmit event
            onSubmit={(values) => {
                const newTask = new Task(values.name, values.description, false, values.level);
                add(newTask);
            }}
        >

            {({ errors, touched }) => (
                <Form className={darkMode ? "dark-mode" : ""}>
                    <Field className='form-control mt-2' id="name" name="name" placeholder="Task name" type="text" />
                    {/* task name errors */}
                    {errors.name && touched.name && (<ErrorMessage style={darkMode ? { color: "beige" } : { color: "black" }} name="name" component="div" className="error-message" />)}

                    <Field className='form-control mt-2' id="description" name="description" placeholder="Task description" type="text" />
                    {/* description errors */}
                    {errors.description && touched.description && (<ErrorMessage style={darkMode ? { color: "beige" } : { color: "black" }} name="description" component="div" className="error-message" />)}

                    <div className='selector d-flex mt-2'>
                        <label htmlFor="level" className='sr-only align-self-center me-3'>Priority</label>
                        <Field className='form-select' as="select" name="level" id="level" defaultValue={Levels.Normal}>
                            <option value={Levels.Normal}>Normal</option>
                            <option value={Levels.Urgent}>Urgent</option>
                            <option value={Levels.Blocking}>Blocking</option>
                        </Field>
                    </div>
                    <button className='btn btn-primary w-100 mt-2' type="submit">
                        {lenght > 0 ? "Add Todo" : "Create Your First Todo"}
                    </button>
                </Form>
            )}
        </Formik>
    );
}

TaskFormik.propTypes = {
    add: PropTypes.func.isRequired,
    lenght: PropTypes.number.isRequired,
    darkMode: PropTypes.bool.isRequired,
};

export default TaskFormik;
