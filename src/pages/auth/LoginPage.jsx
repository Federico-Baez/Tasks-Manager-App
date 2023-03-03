import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginFormik from '../../components/pure/forms/loginFormik';

const LoginPage = () => {


    return (
        <div>
            <h1>Login Page</h1>
            <LoginFormik></LoginFormik>
        </div>
    );
}

export default LoginPage;
