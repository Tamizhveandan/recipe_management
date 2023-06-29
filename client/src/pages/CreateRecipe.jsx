import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Label, Input, Button, Container, Row, Col } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addRecipe } from '../features/recipe';
import { useNavigate, useLocation } from 'react-router-dom';
import { updateRecipe} from '../features/recipe';

const CreateRecipe = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  // const recipes = useSelector((state) => state.recipe.value);

  const [nameForm, setNameForm] = useState({
    recipeName: '',
    mealType: '',
    ingredients: [],
    description: '',
  });
 
  useEffect(() => {
    if (location.state && location.state.recipe) {
      const { recipe } = location.state;
      setNameForm(recipe);
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNameForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const newIngredient = e.target.value;
      setNameForm((prevForm) => ({ ...prevForm, ingredients: [...prevForm.ingredients, newIngredient] }));
      e.target.value = '';
    }
  };

  const handleRemoveIngredient = (ingredientIndex) => {
    setNameForm((prevForm) => ({
      ...prevForm,
      ingredients: prevForm.ingredients.filter((_, index) => index !== ingredientIndex),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { recipeName, mealType, ingredients, description } = nameForm;

    if (!recipeName || !mealType || ingredients.length === 0 || !description) {
      alert('Please fill in all the fields');
    } else {
      const recipe = {
        recipeName,
        mealType,
        ingredients,
        description,
      };

      if (location.state && location.state.recipe) {
        // Update existing recipe
        const existingRecipe = location.state.recipe;
        // console.log(existingRecipe.id)
        dispatch(updateRecipe({ id: existingRecipe.recipeName, recipe }));
      } else {
        // Add new recipe
        dispatch(addRecipe(recipe));
      }

      navigate('/');
    }
  };

  return (
    <div style={{ background: 'rgb(242, 250, 241)', fontFamily: 'Poppins, sans-serif', color: 'rgb(8, 7, 7)' }} className='vh-100 d-flex justify-content-center align-items-center'>
      <div style={{ background: "rgb(226,201,196)", width: "50%", height: "auto", padding: "2rem", borderRadius: "10px" }}>
        <Container>
          <Row>
            <Col sm="12" md={{ size: 8, offset: 2 }}>
              <h2 style={{ color: 'black', textAlign: 'center' }}>Recipe Form</h2>
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label for="recipeName" style={{ color: 'rgb(8, 7, 7)' }}>Recipe Name</Label>
                  <Input
                    type="text"
                    name="recipeName"
                    id="recipeName"
                    className="border"
                    style={{ width: '100%', fontSize: '16px' }}
                    value={nameForm.recipeName}
                    onChange={handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="mealType" style={{ color: 'rgb(8, 7, 7)' }}>Meal Type</Label>
                  <Input
                    type="text"
                    name="mealType"
                    id="mealType"
                    className=""
                    style={{ width: '100%', fontSize: '16px' }}
                    value={nameForm.mealType}
                    onChange={handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="ingredients" style={{ color: 'rgb(8, 7, 7)' }}>Ingredients</Label>
                  <div>
                    {nameForm.ingredients.map((ingredient, index) => (
                      <Button
                        key={index}
                        className="mr-2 mb-2"
                        style={{ marginRight: '3px', backgroundColor: 'rgb(8, 7, 7)', color: 'rgb(242, 250, 241)' }}
                        onClick={() => handleRemoveIngredient(index)}
                      >
                        {ingredient} <span className="font-weight-bold">x</span>
                      </Button>
                    ))}
                  </div>
                  <Input
                    type="text"
                    name="ingredients"
                    id="ingredients"
                    className="border"
                    style={{ width: '100%', fontSize: '16px' }}
                    onKeyDown={handleKeyDown}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="description" style={{ color: 'rgb(8, 7, 7)' }}>Description</Label>
                  <Input
                    type="textarea"
                    name="description"
                    id="description"
                    className=""
                    style={{ width: '100%', height: '180px', fontSize: '16px' }}
                    value={nameForm.description}
                    onChange={handleChange}
                  />
                </FormGroup>
                <Button type="submit" color="" style={{ backgroundColor: 'rgb(8, 7, 7)', borderRadius: '15%', color: "rgb(255,255,255)" }}>Submit</Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default CreateRecipe;
