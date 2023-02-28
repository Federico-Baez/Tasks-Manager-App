import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';




const LoginFormik = () => {

    const initialCredential = {
        email: '',
        password: '',
    }

    const loginSchema = Yup.object().shape(
        {
            email: Yup.string()
                    .email('Invalid email format')
                    .required('Email is a required field'),
            password: Yup.string()
                        .required('Password is a required field')
        }
    )

    return (
        <div>
            <h4>Login Formik</h4>
            <Formik
                // Initial values for the form
                initialValues = { initialCredential }
                // Yup validation schema
                validationSchema={loginSchema}
                
                // onSubmit event
                onSubmit={async (values) => {
                    await new Promise((r) => setTimeout(r, 1000));
                    alert(JSON.stringify(values, null, 2));
                    //We save the data in the local storage
                    localStorage.setItem('credentials', values);
                }}
            >

                {({ errors, touched, isSubmitting })=>(
                    <Form>
                            <label htmlFor="email">Email</label>
                            <Field id="email" name="email" placeholder="example@email.com"/>
                            {/* email errors */}
                            {errors.email && touched.email && (<ErrorMessage name="email" component="div" />)}

                            <label htmlFor="password">Password</label>
                            <Field id="password" name="password" placeholder="Password" type="password"/>
                            {/* password errors */}
                            {errors.password && touched.password && (<ErrorMessage name="password" component="div" />)}
                            
                            <button type="submit">Login</button>
                            {isSubmitting ? (<p>Login your credentials...</p>): null}
                        </Form>
                )}
                
            </Formik>
        </div>
    );
}

export default LoginFormik;
