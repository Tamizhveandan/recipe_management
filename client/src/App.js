import react from 'react'
import { BrowserRouter,Route,Routes } from "react-router-dom";
import Home from './pages/Home'
import CreateRecipe from './pages/CreateRecipe'
import Navbar from './components/Navbar';
import RecipePage from './pages/RecipePage';

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/create-recipe" element={<CreateRecipe/>} />
        <Route  path="/recipe-page/:id" element={<RecipePage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
