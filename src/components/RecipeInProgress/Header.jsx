import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

export default function Header(props) {
  const { data, type } = props;
  const typeOfKeys = [
    ['strDrink', 'strDrinkThumb', 'strCategory', 'idDrink', '', 'strAlcoholic'],
    ['strMeal', 'strMealThumb', 'strCategory', 'idMeal', 'strArea', '']];
  const headerType = type === 'cocktail' ? 'drinks' : 'meals';
  const headerData = headerType === 'drinks' ? typeOfKeys[0] : typeOfKeys[1];
  const FAVORITE_KEY = 'favoriteRecipes';
  const saveFavoriteObj = {
    id: data[headerType][0][headerData[3]],
    type: headerType === 'drinks' ? 'drink' : 'meal',
    area: data[headerType][0][headerData[4]],
    category: data[headerType][0][headerData[2]],
    alcoholicOrNot: data[headerType][0][headerData[5]],
    name: data[headerType][0][headerData[0]],
    image: data[headerType][0][headerData[1]],
  };

  // verifica a existencia da chave de receitas favoritas no local storage
  // caso nao exista, cria-se a chave.
  const verifyLocalStorageFavoriteKey = () => {
    const key = localStorage.getItem(FAVORITE_KEY);
    if (!key) {
      localStorage.setItem(FAVORITE_KEY, JSON.stringify([]));
    }
  };

  const saveFavorite = () => {
    const id = data[headerType][0][headerData[3]];
    const favoriteRecipes = JSON.parse(localStorage.getItem(FAVORITE_KEY)); // array de objetos
    const NOT_FOUND = -1;
    const index = favoriteRecipes.findIndex((e) => e.id === id);

    // somente salva nos favoritos se o item nao existir na lista de favoritos
    // caso exista, remove da lista.
    if (index === NOT_FOUND) {
      const newFavorite = [...favoriteRecipes, saveFavoriteObj];
      localStorage.setItem(FAVORITE_KEY, JSON.stringify(newFavorite));
    } else {
      const removeFavorite = [...favoriteRecipes.filter((e) => e.id !== id)];
      localStorage.setItem(FAVORITE_KEY, JSON.stringify(removeFavorite));
    }
  };

  useEffect(() => {
    verifyLocalStorageFavoriteKey();
  });

  return (
    <header className="recipe-head-container">
      <img
        src={ data[headerType][0][headerData[1]] }
        alt="edible"
        data-testid="recipe-photo"
      />
      <div className="recipe-title">
        <h2 data-testid="recipe-title">{ data[headerType][0][headerData[0]] }</h2>
        <div>
          <button type="button" data-testid="share-btn">Share</button>
          <button
            type="button"
            data-testid="favorite-btn"
            onClick={ saveFavorite }
          >
            Favorite
          </button>
        </div>
      </div>
      <p data-testid="recipe-category">{ data[headerType][0][headerData[2]] }</p>
    </header>
  );
}

Header.propTypes = {
  data: PropTypes.objectOf(PropTypes.array).isRequired,
  type: PropTypes.string.isRequired,
};
