import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { User } from '../../../models/user.class'
import { Roles } from '../../../models/roles.enum';

const RegisterFormik = () => {

    let user = new User();

    const initialCredential = {
        username: '',
        email: '',
        password: '',
        //confirm: '', //to confirm password
        role: Roles.User
    }
    
    const registerSchema = Yup.object().shape(
        {
            username: Yup.string()
                        .min(6, "Username too short!")
                        .max(12, "Username too long!")
                        .required("Username is a required field"),
            email: Yup.string()
                    .required('Email is a required field')
                    .email('Invalid email format'),
            role: Yup.string()
                    .oneOf([Roles.User, Roles.Admin], "You must select a role: User/Admin")
                    .required('Role is a required field'),                         
            password: Yup.string()
                        .min(6, 'Password too short!')
                        .required('Password is a required field'),
            confirm: Yup.string()
                        .oneOf([Yup.ref("password"), null],'password must match!')
                        .required('You must confirm the password'), 
                          
        }
    )

    const submit = (values) => {
        alert("register user");
    }

    return (
        <div>
            <h4>Register form</h4>
            <Formik
                // Initial values for the form
                initialValues = { initialCredential }
                // Yup validation schema
                validationSchema={registerSchema}
                
                // onSubmit event
                onSubmit={async (values) => {
                    await new Promise((r) => setTimeout(r, 1000));
                    alert(JSON.stringify(values, null, 2));
                }}
            >
            {({ errors, touched, isSubmitting })=>(
                <Form>
                    <label htmlFor="username">Username</label>
                    <Field id="username" name="username" placeholder="Username"/>
                    {/* username errors */}
                    {errors.username && touched.username && (<ErrorMessage name="username" component="div" />)}

                    <label htmlFor="email">Email</label>
                    <Field id="email" name="email" placeholder="example@email.com"/>
                    {/* email errors */}
                    {errors.email && touched.email && (<ErrorMessage name="email" component="div" />)}

                    <label htmlFor="password">Password</label>
                    <Field id="password" name="password" placeholder="Password" type="password"/>
                    {/* password errors */}
                    {errors.password && touched.password && (<ErrorMessage name="password" component="div" />)}

                    <label htmlFor="confirm">Confirm password</label>
                    <Field id="confirm" name="confirm" placeholder="Confirm password" type="password"/>
                    {/* confirm password errors */}
                    {errors.confirm && touched.confirm && (<ErrorMessage name="confirm" component="div" />)} 
                    

                    <button type="submit">Register</button>
                    {isSubmitting ? (<p>Loading...</p>): null}
                </Form>
                )}

            </Formik>
        </div>
    );
}

export default RegisterFormik;
