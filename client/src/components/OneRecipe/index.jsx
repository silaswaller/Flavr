import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from '../Header';
import './OneRecipe.css';

const OneRecipe = (props) => {

    const {id} = useParams();

    const [recipe, setRecipe] = useState("");
    const [ingredients, setIngredients] = useState([]);
    const [recipeList, setRecipeList] = useState([]);
    // const [createdBy, setCreatedBy] = useState('');

    const navigate = useNavigate();

    const [user, setUser] = useState("");
    useEffect(() => {
        axios.get('http://localhost:8000/api/loggedInUser', { withCredentials: true })
            .then((res) => {
                console.log(res);
                console.log(res.data);
                setUser(res.data);
            })
    }, [])

    useEffect(() => {
        axios.get(`http://localhost:8000/api/Recipes/${id}`)
        .then((res) => {
            // console.log(res.data);
            // console.log(res.data.ingredients)
            setRecipe(res.data);
            setIngredients(res.data.ingredients);
            console.log(res.data.createdBy);
        })
        .catch((err) => {
            console.log(err)
        })
    }, [id])

    const deleteRecipe = (idFromBelow) => {
        axios.delete(`http://localhost:8000/api/Recipes/${idFromBelow}`)
            .then((res) => {
                console.log(res);
                console.log(res.data);
                setRecipeList(recipeList.filter(recipe => recipe._id !== idFromBelow));
                navigate('/home');
            })
            .catch((err) => console.log(err));
    }

    const editRecipe = () => {
        navigate(`/edit/${recipe._id}`)
    }


    return(
        <div>
            <Header />
            <div className="editContainer">
                <div id="recipeTitleImageDescription">
                    <h1 id="oneRecipeName">{recipe.name}</h1>
                    <img id="oneRecipeImage" src={recipe.image} className="oneImg" alt=''/>
                    <h4 id="oneRecipeUsername">by {recipe.createdBy?.username}</h4>
                    <p id="oneRecipeDescription">{recipe.description}</p>
                </div>
                <h4 id="oneRecipeCookTimeAndServes">Cook Time: {recipe.cookTime}  |  Serves: {recipe.serves}</h4>
                <div id="recipeIngredientsAndPreparation">
                        <ul id="oneRecipeIngredients">
                            {
                                ingredients.map((ingredient, index)=>{
                                        return(
                                        <li>{ingredient.name}</li> 
                                        )
                                    })
                            }
                        </ul>
                        <p  id="oneRecipePreparation">{recipe.preparation}</p>
                </div>
            </div>
            {
                user._id === recipe.createdBy?._id ? //CREDIT FOR THIS LINE: Bo for the "createdBy?", Ethan for the screenshare, Jena for saying "why is there a question mark there?"
                    <div id="editAndDeleteButtons" className="btnContainer">
                        <button className="btn" onClick={() => editRecipe()}>Edit</button>
                        <button className="btn" onClick={() => deleteRecipe(recipe._id)}>Delete</button>
                    </div>:
                    ""
            }
        </div>
    )
}

export default OneRecipe;