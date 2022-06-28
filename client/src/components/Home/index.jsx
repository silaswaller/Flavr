import React, { useState, useEffect } from 'react';
import Header from '../Header';
import './Home.css';
import axios from 'axios';


function Home(props) {

    const [user, setUser] = useState({});


    useEffect(() => {
        axios.get("http://localhost:8000/api/loggedInUser",
            { withCredentials: true }
        )
            .then((res) => {
                console.log(res.data);
                setUser(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    return(
        <div className='homeContainer'>
            <Header />

            <div>
                <h1>Welcome {user.username}</h1>
            </div>
        </div>
    );
};

export default Home;