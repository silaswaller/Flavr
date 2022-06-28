import React from 'react';
import './LoginRegister.css';
import { Link } from 'react-router-dom';

function LoginRegister() {

    return(
        <div className='loginRegisterContainer'>
            <h1 className='logo'>Flavr</h1>
            <h2>A Delicious Social Destination</h2>
            <div className='btnContainer'>
                <Link to='/login' className='btn'>Login</Link>
                <Link to='/register' className='btn'>Sign Up</Link>
            </div>
        </div>
    );
};

export default LoginRegister;