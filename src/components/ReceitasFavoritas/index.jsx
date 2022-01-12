import React, { useState, useEffect } from 'react';
import Header from '../Header';
import CardFav from '../Card/CardFav';

export default function FavoriteRecipes() {
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
  const localFavoriteRecipes = JSON.parse(localStorage.getItem('doneRecipes'))
    ? (JSON.parse(localStorage.getItem('doneRecipes'))) : doneRecipess;
  console.log(doneRecipess, localFavoriteRecipes);
  // const localFavoriteRecipes = [];
  const [favoriteRecipes, setFavoriteRecipes] = useState([...localFavoriteRecipes]);
  const handleClick = ({ target }) => {
    const { value } = target;
    console.log(value);
    if (value === 'All') {
      setFavoriteRecipes(localFavoriteRecipes);
      console.log('All');
    } else if (value === 'Food') {
      const comidas = localFavoriteRecipes.filter((el) => el.type === 'comida');
      setFavoriteRecipes(comidas);
      console.log('food');
    } else {
      const bebidas = localFavoriteRecipes.filter((el) => el.type === 'bebida');
      setFavoriteRecipes(bebidas);
      console.log('drinks');
    }
  };

  useEffect(() => {
    console.log(favoriteRecipes);
  }, [favoriteRecipes]);
  return (
    <div>
      <Header name="Receitas Favoritas" search={ false } apiType="generic" />
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
      {favoriteRecipes.map((el, index) => (el.type === 'comida' ? (
        <CardFav
          key={ index }
          recipe={ el }
          index={ index }
          apiType="meal"
          stFav={ setFavoriteRecipes }
        />
      ) : (
        <CardFav
          key={ index }
          recipe={ el }
          index={ index }
          apiType="cocktail"
          stFav={ setFavoriteRecipes }
        />
      )))}
    </div>
  );
}
