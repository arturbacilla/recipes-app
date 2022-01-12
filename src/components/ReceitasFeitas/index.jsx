import React, { useState } from 'react';
import Header from '../Header';
import CardDone from '../Card/CardDone';

export default function RecipesDone() {
  const doneRecipess = [
    {
      id: '52771',
      type: 'comida',
      area: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      doneDate: '23/06/2020',
      tags: ['Pasta', 'Curry'],
    },
    {
      id: '178319',
      type: 'bebida',
      area: '',
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      name: 'Aquamarine',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
      doneDate: '23/06/2020',
      tags: [],
    },
  ];
  const localRecipesDone = JSON.parse(localStorage.getItem('doneRecipes'))
    ? (JSON.parse(localStorage.getItem('doneRecipes'))) : doneRecipess;
  console.log(doneRecipess);
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
      <Header name="Receitas Feitas" search={ false } apiType="generic" />
      <div className="button-container">
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
      </div>
      {recipesDone.map((el, index) => (el.type === 'comida' ? (
        <CardDone key={ index } recipe={ el } index={ index } apiType="meal" />
      ) : (
        <CardDone key={ index } recipe={ el } index={ index } apiType="cocktail" />
      )))}
    </div>
  );
}
