import React, { useEffect, useState } from 'react';
import Header from '../Header';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './EditRecipe.css'



const EditRecipe = (props) => {

    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [cookTime, setCookTime] = useState('');
    const [serves, setServes] = useState('');
    const [description, setDescription] = useState('');
    const [preparation, setPreparation] = useState('');
    const [ingredients, setIngredients] = useState([]);

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/Recipes/${id}`)
            .then((res) => {
                console.log(res);
                console.log(res.data);
                setName(res.data.name);
                setImage(res.data.image);
                setCookTime(res.data.cookTime);
                setServes(res.data.serves);
                setDescription(res.data.description);
                setPreparation(res.data.preparation);
                setIngredients(res.data.ingredients);
            })
            .catch((err) => console.log(err));
    }, [id])

    const submitHandler = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/Recipes/${id}`,
            {
                name,
                image,
                cookTime,
                serves,
                description,
                preparation,
                ingredients
            })
            .then((res) => {
                console.log(res);
                console.log(res.data);
                navigate('/home');
            })
            .catch((err) => console.log(err));
    }


    return (

        <div className='pageContainer'>
            <Header />

            <form onSubmit={submitHandler}>
                <div className='formContainer'>
                <div>
                    <label>Name: </label>
                    <input value={name} onChange={(e) => setName(e.target.value)} type='text' />
                </div>

                <div>
                    <label>Image: </label>
                    <input value={image} onChange={(e) => setImage(e.target.value)} type='text' />
                </div>

                <div>
                    <label>Cook Time: </label>
                    <input value={cookTime} onChange={(e) => setCookTime(e.target.value)} type='text' />
                </div>

                <div>
                    <label>Serves: </label>
                    <input value={serves} onChange={(e) => setServes(e.target.value)} type='text' />
                </div>

                <div>
                    <label>Description: </label>
                    <input value={description} onChange={(e) => setDescription(e.target.value)} type='text' />
                </div>

                <div>
                    <label>Preparation: </label>
                    <input value={preparation} onChange={(e) => setPreparation(e.target.value)} type='text' />
                </div>

                {/* <div>
                    <label>Ingredients</label>
                    <input value={ingredients} onChange={(e) => setIngredients(e.target.value)} type='text' />
                </div> */}
                </div>

                <button className='btn'>Update Recipe</button>
            </form>

        </div>
    )
}

export default EditRecipe;
