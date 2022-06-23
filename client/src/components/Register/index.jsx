import React, { useState } from 'react';
import './Register.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Register(props) {
    const [errors, setErrors] = useState([]);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [profilePic, setProfilePic] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/users/register', {
                username,
                email,
                profilePic,
                password,
                confirmPassword
            })
                .then(res=>{
                    console.log(res.data);
                })
                .catch((err)=>{
                    const errorResponse = err.response.data.errors;
                    const errorArr = [];
                    for (const key of Object.keys(errorResponse)) {
                        errorArr.push(errorResponse[key].message)
                    }
                    setErrors(errorArr);
                })
    }

    return(
        <div className='registerContainer'>
            <h1 className='registerH1'>Register</h1>
            <form className='registerForm' onSubmit={submitHandler}>
                {errors.map((err, index) => <p key={index} className='errorMsg'>{err}</p>)}
                <label>
                    Username:
                    <input
                    type="text"
                    className='textInput'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    />
                </label>
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
                    Profile Picture:
                    <input
                    type="text"
                    className='textInput'
                    value={profilePic}
                    onChange={(e) => setProfilePic(e.target.value)}
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
                <label>
                    Confirm Password:
                    <input
                    type="password"
                    className='textInput'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </label>
                <input type="submit" value="Sign Up" className='submitBtn' />
            </form>
            <Link to='/login'>Already have an account? Login here!</Link>
        </div>
    );
};

export default Register;