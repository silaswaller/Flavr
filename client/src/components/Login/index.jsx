import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login(props) {
    const [errors, setErrors] = useState([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/users/login', {
                email: email,
                password: password
            },
            {
                withCredentials: true,
            })
                .then(res=>{
                    console.log(res);
                    console.log(res.data);
                    navigate('/home');
                })
                .catch((err)=>{
                    const errorResponse = err.response.data.message;
                    setErrors(errorResponse); //Error messages fixed by Ethan
                })
    }

    return(
        <div className='loginContainer'>
            <h1 className='loginH1'>Login</h1>
            <form className='loginForm' onSubmit={submitHandler}>
                {errors ?
                    <p className='errorMsg'>{errors}</p>:
                    ""
                } {/* error message here fixed by Ethan */}
                <label>
                    Email:
                    <input
                    type="text"
                    className='textInput'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                <label>
                    Password:
                    <input
                    type="password"
                    className='textInput'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <input type="submit" value="Login"  className='submitBtn' />
            </form>
            <Link to='/register'>Don't have an account? Sign up here!</Link>
        </div>
    );
};

export default Login;