import React from 'react';
import { Link } from 'react-router-dom';
// navbar

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className='link-container position-relative text-start' style={{ marginLeft: "10px" }}>
        <span className="brand">DishMaster</span>
      </div>
      <div className='link-container' style={{ marginRight: "10px" }}>
        <Link to="/" className='position-relative fs-6 text-decoration-none px-2'>
          <i className="fa-solid fa-house"></i>
          <span className="text">Home</span>
        </Link>
        <Link to="/create-recipe" className='position-relative fs-6 text-decoration-none px-2'>
          <i className="fa-solid fa-plus"></i>
          <span className="text">Add Recipe</span>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;

