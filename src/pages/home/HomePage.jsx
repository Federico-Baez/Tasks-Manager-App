import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const HomePage = () => {
    /* navigate */
    const navigate = useNavigate();

    const navigateTo = (path) => navigate(path);

    const navigateProps = (path) => {

        navigate(`${path}?online=true`, {state: { online: true }});
    }

    return (
        <div>
            <h1>Home Page</h1>
            <h2>Dashboard</h2>
            <button className='btn btn-warning' onClick={()=> navigateTo("/profile")}>Go to Profile</button>
            <button className='btn btn-warning ms-4' onClick={()=> navigateProps("/online-state")}>Go to Page with state / query params</button>
        </div>
    );
}

export default HomePage;
