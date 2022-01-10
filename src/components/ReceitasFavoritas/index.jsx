import React, { useState, useEffect } from 'react';
import Header from '../Header';
import CardFav from '../Card/CardFav';

export default function FavoriteRecipes() {
  const localFavoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const [favoriteRecipes, setFavoriteRecipes] = useState(localFavoriteRecipes);
  console.log(localFavoriteRecipes);
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
