import React, { useState } from 'react';
import './RecipeForm.css';
import Header from '../Header';
import addIcon from './plus.png';

function RecipeForm() {
    //will add states to each input when I have a model to interact with
    //will also be adding a conditional for if this form is used for adding a new recipe or editing one

    return(
        <div className='recipeFormContainer'>
            <Header />
            <h1 className='recipeFormH1'>Add A Recipe!</h1>
            <form className='recipeForm'>
                <div className='formColContainer'>
                    <div className='formCol'>
                        <label>
                            Recipe Name:
                            <input type="text" />
                        </label>
                        <label>
                            Image:
                            <input type="text" />
                        </label>
                        <label>
                            Cook Time:
                            <input type="text" />
                        </label>
                        <label>
                            Serves:
                            <input type="text" />
                        </label>
                        <label className='textAreaLabel'>
                            Description:
                            <textarea></textarea>
                        </label>
                        <label className='textAreaLabel'>
                            Preparation:
                            <textarea></textarea>
                        </label>
                        <input type="submit" value="Add Recipe" className='recipeFormSubmit' />
                    </div>
                    <div className='formCol'>
                        <label className='ingredientLabel'>
                            Ingredients:
                        </label>
                        {/*Change this to be dependent on ingredient num,
                        don't know how to format until we have a recipe model*/}
                        <input type="text" className='ingredientInput' />
                        <input type="text" className='ingredientInput' />
                        <input type="text" className='ingredientInput' />
                        <input type="text" className='ingredientInput' />
                        <div className='addIngredientContainer'>
                            <img src={addIcon} alt="" />
                            <p>Add Ingredients</p>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default RecipeForm;