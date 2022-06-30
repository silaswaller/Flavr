import React, { useState, useEffect } from 'react';
import './RecipeForm.css';
import Header from '../Header';
// import addIcon from './plus.png';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function RecipeForm(props) {
    const navigate = useNavigate();
    const [errors, setErrors] = useState([]);
    const {id} = useParams();
    const {view} = props;
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [cookTime, setCookTime] = useState('');
    const [serves, setServes] = useState('');
    const [description, setDescription] = useState('');
    const [preparation, setPreparation] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const [newIngredient, setNewIngredient] = useState({
        name: ""
    });
    const [createdBy, setCreatedBy] = useState(''); //Not quite sure how to format this based on model

    useEffect(()=>{
        if(view === 'edit') {
            axios.get(`http://localhost:8000/api/Recipes/${id}`)
            .then((res)=>{
                console.log(res.data);
                setName(res.data.name);
                setImage(res.data.image);
                setCookTime(res.data.cookTime);
                setServes(res.data.serves);
                setDescription(res.data.description);
                setPreparation(res.data.preparation);
                setIngredients(res.data.ingredients);
            })
            .catch((err)=>{
                console.log(err);
            })
        }
    }, [])

    const submitHandler = (e) => {
        e.preventDefault();
        if(view === 'edit'){
            axios.put(`http://localhost:8000/api/Recipes/${id}`, {
                name,
                image,
                cookTime,
                serves,
                description,
                preparation,
                ingredients
            })
                .then( res => {
                    console.log(res);
                    navigate('/home');
                })
                .catch((err)=>{
                    const errorResponse = err.response.data.errors;
                    const errorArr = [];
                    for (const key of Object.keys(errorResponse)) {
                        errorArr.push(errorResponse[key].message)
                    }
                    setErrors(errorArr);
                })
        } else {
            axios.post('http://localhost:8000/api/Recipes', {
                name,
                image,
                cookTime,
                serves,
                description,
                preparation,
                ingredients
            }, { withCredentials: true })
                .then(res=>{
                    console.log(res);
                    console.log(res.data);
                    navigate('/home');
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
    }


    const updateIngredient = (e)=>{
        let ingredientCopy = {...newIngredient};
        console.log(e.target.name, e.target.value);
        ingredientCopy[e.target.name]  = e.target.value;
        setNewIngredient(ingredientCopy)
        

    }

    const addIngredients = (e)=>{
        e.preventDefault();
        setIngredients([...ingredients, newIngredient]);
        setNewIngredient({
            name:""
        });
    }



    return(
        <div className='recipeFormContainer'>
            <Header />
            {
                view === 'edit' ?
                <h1 className='recipeFormH1'>Edit</h1> :
                <h1 className='recipeFormH1'>Add A Recipe!</h1>
            }
            <form className='recipeForm' onSubmit={submitHandler}>
                <div className='recipeFormErrorBox'>
                    {errors.map((err, index) => <p key={index} className='errorMsg'>{err}</p>)}
                </div>
                <div className='formColContainer'>
                    <div className='formCol'>
                        <label>
                            Recipe Name:
                            <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            />
                        </label>
                        <label>
                            Image:
                            <input
                            type="text"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            />
                        </label>
                        <label>
                            Cook Time:
                            <input
                            type="text"
                            value={cookTime}
                            onChange={(e) => setCookTime(e.target.value)}
                            />
                        </label>
                        <label>
                            Serves:
                            <input
                            type="text"
                            value={serves}
                            onChange={(e) => setServes(e.target.value)}
                            />
                        </label>
                        <label className='textAreaLabel'> {/*There's an error coming from both texteareas, not sure of a way around*/}
                            Description:
                            <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}></textarea>
                        </label>
                        <label className='textAreaLabel'>
                            Preparation:
                            <textarea
                            value={preparation}
                            onChange={(e) => setPreparation(e.target.value)}></textarea>
                        </label>
                        <input type="submit" value="Add Recipe" className='recipeFormSubmit' />
                    </div>







                    <div className='formCol'>
                        <label className='ingredientLabel'>
                            Ingredients:
                        </label>
                        <input type="text" name='name' value={newIngredient.name} onChange={updateIngredient} className='ingredientInput' />
                        <button onClick={addIngredients} className='recipeFormSubmit'>Add an Ingredient</button>
                        
                        <div>
                            {
                                ingredients.map((ingredient, index) => (
                                    <p key={index} className="ingredient">{ingredient.name}</p>
                                ))
                            }
                        </div>
                    </div>

                </div>
                

            </form>
        </div>
    );
};

export default RecipeForm;