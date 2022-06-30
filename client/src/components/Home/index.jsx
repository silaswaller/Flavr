import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header';
import './Home.css';
import axios from 'axios';
import star from './images/favoriteStar.png';
import likeBtn from './images/likeImage.png';


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

        axios.get("http://localhost:8000/api/recipes", {

        })
        .then((res) => {
            console.log(res);
            console.log(res.data);
            setRecipeList(res.data);
        })
        .catch((err) => {
            console.log(err);
        })
    }, [])

    const like = (id) => {

    }

    const favorite = () => {
        
    }

    

    return(
        <div className='homeContainer'>
            <Header />

            <div>
                <h1 id="welcomeUsername">Welcome, {user.username}!</h1>
            </div>
            <div className='container' id='container'>
                
                {
                    
                    recipeList.map((recipe, index) => (
                        <div>
                            <div id="homeRecipe" key={recipe._id}>
                                <Link to={`/Recipe/${recipe._id}`} className='recipeLinkName'><h1 id="recipeName">{recipe.name}</h1></Link>
                                <a href={`/Recipe/${recipe._id}`}><img className="homeRecipeImage" src={recipe.image} alt=''/></a>
                                <div id="likeAndFavorite">
                                    <div id="like">
                                        <button onClick={like(recipe._id)} className="recipeBtn">
                                        <img className="icon" src={likeBtn} alt='like' onClick={like}></img>
                                        <h4>Likes</h4>
                                        </button>
                                    </div>
                                    <div id="favorite">
                                        <button onClick={favorite} className="recipeBtn">
                                        <img className="icon" src={star} alt='favStar' ></img>
                                        <h4>Add to Favorites</h4>
                                        </button>
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