import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import LoginRegister from './components/LoginRegister';
import Login from './components/Login';
import Register from './components/Register';
import RecipeForm from './components/RecipeForm';
import Home from './components/Home';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <LoginRegister /> } />
          <Route path='/login' element={ <Login /> } />
          <Route path='/register' element={ <Register /> } />
          <Route path='/home' element={ <Home /> } />
          <Route path='/new' element={ <RecipeForm /> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
