import React, { useState } from 'react';
import art from '../assets/Artboard.png';
import { Link } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';
import { motion } from "framer-motion"
import { useSelector } from 'react-redux';

const Home = () => {
    const recipes = useSelector((state)=> state.recipe.value)
    // console.log(recipes)

  const [noData, setNoData] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

//   const recipes = [
//     { label: 'Chicken', mealType: 'Dinner', ingredients: ['ingredient1', 'ingredient1'] },
//     { label: 'Chicken2', mealType: 'Lunch', ingredients: ['ingredient2', 'ingredient1', 'ingredient1'] },
//     { label: 'Chicken2', mealType: 'Lunch', ingredients: ['ingredient2', 'ingredient1', 'ingredient1'] }
//   ];

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredRecipes = recipes.filter((recipe) => {
    const { recipeName, ingredients } = recipe;
    const searchTerm = searchQuery.toLowerCase();

    // Check if the recipe label or any ingredient contains the search query
    return recipeName.toLowerCase().includes(searchTerm) || ingredients.some((ingredient) => ingredient.toLowerCase().includes(searchTerm));
  });

  const heroContainer ={
    initial:{
      x:"-100%",
      opacity:0
    },
    visible:{
      x:0,
      opacity:1,
      transition:{
        delay:0.5,
        duration:1,
        ease:"easeOut"
      }
    }
  }

  return (
    <div style={{ backgroundColor: 'rgb(242, 250, 241)', color: 'rgb(8, 7, 7)' }}>
        <div style={{display:"flex" , flexDirection:"row"}}>
        <motion.div 
            className='hero'
            variants={heroContainer} initial="initial" whileInView="visible" 
            viewport={{ once: true }}
        >
            <div className='heading'>
                <h1>Welcome</h1><h2> To DishMaster</h2>
            </div>
            <p className='hero-text'>
                Cooking is the art of adjustment and adaptation, <br/>
                and DishMaster is your palette of possibilities.
            </p>
            <Link to='/create-recipe'><button className='hero-btn'>Add recipe</button></Link>
            
        </motion.div>
        <motion.div>
            <img src={art} alt='art'className='art'/>
        </motion.div>
        </div>
        
      <h2 style={{ marginTop: '6rem',textAlign:"center"}}>Your recipe list</h2>
      <div className='d-flex flex-column justify-content-center align-items-center'>
        <input
          type='text'
          placeholder='Search recipes...'
          value={searchQuery}
          onChange={handleSearch}
          style={{ backgroundColor: 'rgb(255, 255, 255)',
           color: 'rgb(8, 7, 7)', width: '50%', marginTop: '1rem',
         border:"none" , padding: " 10px 13px" , borderRadius:"0px"}}
        />
        {noData ? (
          <div 
            style={{marginTop:"5%" ,  marginBottom:"5%", fontSize:"x-large"}}
            className='d-flex justify-content-center align-items-center  text-warning'>
                <i class="fa-regular fa-face-sad-tear" style={{marginRight:"10px"}}></i>
            No recipe found
          </div>
        ) : filteredRecipes.length === 0 ? (
          <div 
            style={{marginTop:"5%" , marginBottom:"5%", fontSize:"x-large"}}
            className='d-flex justify-content-around align-items-center flex-warp'>
            <i className="fa-regular fa-face-sad-tear" style={{marginRight:"10px"}}></i>
              Recipe not found
        
          </div>
        ) : (
          <div style={{width:"100%",display:"flex" , flexWrap:"wrap",justifyContent:"space-around"}}>
            {filteredRecipes.map((recipe, index) => <RecipeCard key={index} data={recipe} />)}
          </div>
        )}
        <div style={{marginTop:"5%"}}></div>
      </div>
    </div>
  );
};

export default Home;
