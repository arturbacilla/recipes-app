import React, { useState } from 'react';
import Header from '../Header';
import CardDoneMeals from '../Card/CardDone';

export default function RecipesDone() {
  // const { recipesDone } = useContext(RecipesContext);
  const localRecipesDone = JSON.parse(localStorage.getItem('doneRecipes'));
  const [recipesDone, setRecipesDone] = useState([...localRecipesDone]);
  console.log(recipesDone);
  const handleClick = ({ target }) => {
    const { value } = target;
    console.log(value);
    if (value === 'All') {
      setRecipesDone([...localRecipesDone]);
      console.log('All');
    } else if (value === 'Food') {
      const comidas = localRecipesDone.filter((el) => el.type === 'comida');
      setRecipesDone(comidas);
      console.log('food');
    } else {
      const bebidas = localRecipesDone.filter((el) => el.type === 'bebida');
      setRecipesDone(bebidas);
      console.log('drinks');
    }
  };
  return (
    <div>
      <Header name="Receitas Feitas" search={ false } />
      <h3>Receitas Feitas</h3>
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ handleClick }
        value="All"
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ handleClick }
        value="Food"
      >
        Food

      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ handleClick }
        value="Drinks"
      >
        Drinks
      </button>
      {recipesDone.map((el, index) => (el.type === 'comida' ? (
        <CardDoneMeals key={ index } recipe={ el } index={ index } apiType="meal" />
      ) : (
        <CardDoneMeals key={ index } recipe={ el } index={ index } apiType="cocktail" />
      )))}
    </div>
  );
}
