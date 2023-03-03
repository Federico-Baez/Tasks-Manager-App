import React from 'react';
import { Link } from 'react-router-dom';

//style
import '../../styles/nav.scss'

const Nav = () => {
    return (
        <header className='head'>
            <nav>
                <ul>
                <li className='item'> <Link to="/">Home</Link> </li>
                <li className='item'> <Link to="/about">About</Link> </li>
                <li className='item'> <Link to="/task/0">Task0</Link> </li>
                <li className='item'> <Link to="/task/1">Task1</Link> </li>
                <li className='item'> <Link to="/profile">Profile</Link></li>
                <li className='item'> <Link to="/any404">404</Link> </li>
                {/* <li className='item'> <Link to="/login">Login</Link> </li> */}
                {/* {user ? 
                (<button onClick={handleLogout}>Sign Out</button>) 
                : 
                (<button onClick={handleLogin}>Sign In</button>)
                } */}
                </ul>
            </nav>
        </header>
    );
}

export default Nav;
