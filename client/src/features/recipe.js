import { createSlice } from "@reduxjs/toolkit";

const recipeSlice = createSlice({
    name: 'recipe',
    initialState: {
      value: [],
    },
    reducers: {
      addRecipe: (state, action) => {
        state.value.push(action.payload);
      },
      updateRecipe: (state, action) => {
        const { id, recipe } = action.payload;
        const index = state.value.findIndex((r) => r.recipeName === id);
        if (index !== -1) {
          state.value[index] = { ...state.value[index], ...recipe };
        }
      },
      deleteRecipe: (state, action) => {
        const id = action.payload;
        state.value = state.value.filter((recipe) => recipe.recipeName !== id);
      },
    },
  });
  

export const { addRecipe , updateRecipe , deleteRecipe } = recipeSlice.actions;
export default recipeSlice.reducer;
