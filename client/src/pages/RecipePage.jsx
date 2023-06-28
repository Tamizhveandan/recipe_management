import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {  deleteRecipe } from '../features/recipe';


const RecipePage = () => {
  const recipes = useSelector((state) => state.recipe.value);
  const { id } = useParams();
  const recipe = recipes.find((recipe) => recipe.recipeName === id);
  const navigate = useNavigate();
  const dispatch = useDispatch()

  if (!recipe) {
    // Handle case when recipe is not found
    return <div>Recipe not found</div>;
  }

  const handleEdit = () => {
    navigate(`/create-recipe`, { state: { recipe } });
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      dispatch(deleteRecipe(recipe.id));
      navigate('/');
    }
  };
  

  return (
    <div className='recipePage'>
      <div className='recipeContainer'>
        <h2>{recipe.recipeName}</h2>
        <div style={{ marginTop: '30px', fontSize: 'large', fontWeight: '600' }}>
          Meal Type: <span style={{ fontWeight: 'normal' }}>{recipe.mealType}</span>
        </div>
        <div>
          <h3 style={{ marginTop: '1rem' }}>Ingredients:</h3>
          <ul>
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Description:</h3>
          <div style={{ marginLeft: '20px' }}>{recipe.description}</div>
        </div>
        <div className='btn'>
          <button className='edit-btn' onClick={handleEdit}>
            <i className='fa-solid fa-pen'></i>Edit
          </button>
          <button className='delete-btn' onClick={handleDelete}>
            <i className='fa-solid fa-trash'></i>Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipePage;
