import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header';
import './Home.css';
import axios from 'axios';

function Home(props) {

    const [user, setUser] = useState({});
    const [recipeList, setRecipeList] = useState([]);

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

    useEffect(() => {

        axios.get("http://localhost:8000/api/recipes")
        .then((res) => {
            console.log(res);
            console.log(res.data);
            setRecipeList(res.data);
        })
        .catch((err) => {
            console.log(err);
        })
    }, [])

    const like = () => {

    }

    const favorite = () => {
        
    }

    return(
        <div className='homeContainer'>
            <Header />

            <div>
                <h1 id="welcomeUsername">Welcome, {user.username}!</h1>
            </div>
            <div id='container'>
                
                {
                    
                    recipeList.map((recipe, index) => (
                        <div>
                            <div id="homeRecipe" key={recipe._id}>
                                <Link to={`/Recipe/${recipe._id}`} style={{ color: 'white' }}><h1 id="recipeName">{recipe.name}</h1></Link>
                                <img className="homeRecipeImage" src={recipe.image} /> 
                                <div id="likeAndFavorite">
                                    <div id="like">
                                        <img className="icon" src="./images/likeImage.png" onClick={like}></img>
                                        <h4># Likes</h4>
                                    </div>
                                    <div id="favorite">
                                        <img className="icon" src="./images/favroiteStar.png" onClick={favorite}></img>
                                        <h4>Add to Favorites</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
                </div>
        </div>
    );
};

export default Home;