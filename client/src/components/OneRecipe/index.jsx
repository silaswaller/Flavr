import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from '../Header';
import './OneRecipe.css';

const OneRecipe = (props) => {

    const {id} = useParams();

    const [recipe, setRecipe] = useState("");
    const [ingredients, setIngredients] = useState([])
    const [recipeList, setRecipeList] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/Recipes/${id}`)
        .then((res) => {
            console.log(res.data);
            console.log(res.data.ingredients);
            setRecipe(res.data);
            setIngredients(res.data.ingredients);
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
        navigate(`/editRecipe/${recipe._id}`)
    }


    return(
        <div>
            <Header />
            <div className="editContainer">
            <div id = "recipeTitleImageDescription">
                <div>
                    <h1 id="oneRecipeName">{recipe.name}</h1>
                    <h4 id="oneRecipeUsername">by {recipe.createdBy}</h4>
                    <p id="oneRecipeDescription">{recipe.description}</p>
                </div>
            </div>
            <div>
                    <img id="oneRecipeImage" src={recipe.image} className="oneImg" alt=''/>
                </div>
            <br/>
            <h4 id="oneRecipeCookTimeAndServes">Cook Time: {recipe.cookTime}  |  Serves: {recipe.serves}</h4>
            <br/>
            <div id="recipeIngredientsAndPreparation">
                <div id="oneRecipeIngredients">
                    <ul>
                       {
                             ingredients.map((ingredient, index)=>{
                                 return(
                                    <p>Ingredient {index+1}: {ingredient.name} </p> 
                                 )
                             })
                       }
                    </ul>
                </div>
                <div id="oneRecipePreparation">
                    <p>{recipe.preparation}</p>
                </div>
            </div>
            </div>
            <div id="editAndDeleteButtons" className="btnContainer">
                <button className="btn" onClick={() => editRecipe()}>Edit</button>
                <button className="btn" onClick={() => deleteRecipe(recipe._id)}>Delete</button>
                
                </div>
        </div>
    )
}

export default OneRecipe;