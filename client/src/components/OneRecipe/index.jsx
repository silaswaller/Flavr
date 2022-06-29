import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import './OneRecipe.css';

const OneRecipe = (props) => {

    const {id} = useParams();

    const [recipe, setRecipe] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/Recipe/${id}`)
        .then((res) => {
            console.log(res);
            console.log(res.data);
            setRecipe(res.data)
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
            navigate("/")
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const editRecipe = () => {
        navigate(`/Recipe/edit/${recipe._id}`)
    }


    return(
        <div>
            <div id = "recipeTitleImageDescription">
                <div>
                    <h1 id="oneRecipeName">{recipe.name}</h1>
                    <h4 id="oneRecipeUsername">by {recipe.createdBy}</h4>
                    <p id="oneRecipeDescription">{recipe.description}</p>
                </div>
                <div>
                    <img id="oneRecipeImage" src={recipe.image}/>
                </div>
            </div>
            <br/>
            <h4 id="oneRecipeCookTimeAndServes">Cook Time: {recipe.cookTime}  |  Serves: {recipe.serves}</h4>
            <br/>
            <div id="recipeIngredientsAndPreparation">
                <div id="oneRecipeIngredients">
                    <ul>
                        <li></li>
                    </ul>
                </div>
                <div id="oneRecipePreparation">
                    <p>{recipe.preparation}</p>
                </div>
            </div>
            <div id="editAndDeleteButtons">
                <button className="button" onClick={() => editRecipe()}>Edit</button>
                <button className="button" onClick={() => deleteRecipe(recipe._id)}>Delete</button>
                </div>
        </div>
    )
}

export default OneRecipe;