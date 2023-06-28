import React from 'react';
import { Link } from 'react-router-dom';

const RecipeCard = ({ data }) => {
  return (
    <div className="card-container">
      <Link to={`/recipe-page/${data.recipeName}`} className="text-decoration-none">
        <div className="card">
          <h5 className="card-header">{data.recipeName}</h5>
          <div className="card-body">
            <h5 className="card-title">{data.mealType}</h5>
            {data.ingredients.map((item, index) => (
              <div className="ingredient-btn" key={index}>{item}</div>
            ))}
          </div>
        </div>
      </Link>
    </div>
  );
}

export default RecipeCard;
