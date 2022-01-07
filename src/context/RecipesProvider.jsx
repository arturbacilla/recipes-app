import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const [renderBar, setRenderBar] = useState(false);
  const [randomFoodOrDrink, setRandomFoodOrDrink] = useState({});
  const [fetchedRecipes, setFetchedRecipes] = useState([]);
  const [recipesDone, setRecipesDone] = useState([]);
  const valores = {
    renderBar,
    setRenderBar,
    fetchedRecipes,
    setFetchedRecipes,
    randomFoodOrDrink,
    setRandomFoodOrDrink,
    recipesDone,
    setRecipesDone,
  };
  return (
    <main>
      <RecipesContext.Provider value={ valores }>
        { children }
      </RecipesContext.Provider>
    </main>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default RecipesProvider;
