import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import LoginRegister from './components/LoginRegister'
import Login from './components/Login'
import Register from './components/Register'
import RecipeForm from './components/RecipeForm'
import OneRecipe from './components/OneRecipe'
import EditRecipe from './components/EditRecipe/EditRecipe';
import Home from './components/Home'

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LoginRegister />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/new" element={<RecipeForm view={'new'} />} />
                    <Route path="/edit/:id" element={<RecipeForm view={'edit'} />} />

                    <Route path="/recipe/:id" element={<OneRecipe />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
