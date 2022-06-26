import React, { useState, useEffect } from 'react';
import './RecipeForm.css';
import Header from '../Header';
import addIcon from './plus.png';
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
                //setIngredients here somehow
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
                preparation
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
                preparation
            })
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
                    {errors.map((err, index) => <p key={index}>{err}</p>)}
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
                            onChange={(e) => setDescription(e.target.value)}>
                                {description}
                            </textarea>
                        </label>
                        <label className='textAreaLabel'>
                            Preparation:
                            <textarea
                            onChange={(e) => setPreparation(e.target.value)}>
                                {preparation}
                            </textarea>
                        </label>
                        <input
                        type="submit" value="Add Recipe" className='recipeFormSubmit' />
                    </div>
                    <div className='formCol'>
                        <label className='ingredientLabel'>
                            Ingredients:
                        </label>
                        {/*Not really sure how to handle these, The idea is to be able to add fields
                        and then push them all to an array which gets sent to the backend*/}
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