import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../../images/shareIcon.svg';
import whiteFavoriteIcon from '../../images/whiteHeartIcon.svg';
import blackFavoriteIcon from '../../images/blackHeartIcon.svg';

export default function Header(props) {
  const { data, type } = props;
  const typeOfKeys = [
    ['strDrink', 'strDrinkThumb', 'strCategory', 'idDrink', '', 'strAlcoholic'],
    ['strMeal', 'strMealThumb', 'strCategory', 'idMeal', 'strArea', '']];
  const headerType = type === 'cocktail' ? 'drinks' : 'meals';
  const headerData = headerType === 'drinks' ? typeOfKeys[0] : typeOfKeys[1];
  const [isShared, setIsShared] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false); // estado do icone favorito
  const FAVORITE_KEY = 'favoriteRecipes';
  const bFavIcon = (
    <img src={ blackFavoriteIcon } alt="favorite" data-testid="favorite-btn" />);
  const wFavIcon = (
    <img src={ whiteFavoriteIcon } alt="favorite" data-testid="favorite-btn" />);

  const saveFavoriteObj = {
    id: data[headerType][0][headerData[3]],
    type: headerType === 'drinks' ? 'bebida' : 'comida',
    area: data[headerType][0][headerData[4]] ? data[headerType][0][headerData[4]] : '',
    category: data[headerType][0][headerData[2]],
    alcoholicOrNot: data[headerType][0][headerData[5]] ? (
      data[headerType][0][headerData[5]]) : '',
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

  // Retorna true ou false caso o item esteja nos favoritos ou nao.
  const setFavoriteIcon = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem(FAVORITE_KEY));
    const id = data[headerType][0][headerData[3]];
    const NOT_FOUND = -1;
    const index = favoriteRecipes.findIndex((e) => e.id === id);
    setIsFavorite(index === NOT_FOUND);
  };

  // somente salva nos favoritos se o item nao existir na lista de favoritos
  // caso exista, remove da lista.
  // tambem chama a funcao setFavoriteIcon pra definir a img a cada click
  const onClickSaveFavorite = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem(FAVORITE_KEY)); // array de objetos
    const id = data[headerType][0][headerData[3]];
    const NOT_FOUND = -1;
    const index = favoriteRecipes.findIndex((e) => e.id === id);
    if (index === NOT_FOUND) {
      const newFavorite = [...favoriteRecipes, saveFavoriteObj];
      localStorage.setItem(FAVORITE_KEY, JSON.stringify(newFavorite));
    } else {
      const removeFavorite = [...favoriteRecipes.filter((e) => e.id !== id)];
      localStorage.setItem(FAVORITE_KEY, JSON.stringify(removeFavorite));
    }
    setFavoriteIcon();
  };

  const onClickShare = () => {
    // https://blog.dadops.co/2021/03/17/copy-and-paste-in-a-react-app/
    // referencia de resolucao
    const url = window.location.href;
    const editedUrl = url.split('/in-progress').join('');
    const element = document.createElement('input');
    element.value = editedUrl;
    document.body.appendChild(element);
    element.select();
    document.execCommand('copy');
    document.body.removeChild(element);
    setIsShared(true);
  };

  useEffect(() => {
    verifyLocalStorageFavoriteKey();
    setFavoriteIcon(); // Muda o estado do item favorito assim que carrega a pagina.
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
          <button
            type="button"
            data-testid="share-btn"
            className="shareBtn-InProgress"
            onClick={ onClickShare }
          >
            <img src={ shareIcon } alt="share" />
            {isShared ? 'Link copiado!' : 'Share'}
          </button>
          <button
            type="button"
            // data-testid="favorite-btn"
            onClick={ onClickSaveFavorite }
            className="favoriteBtn-InProgress"
          >
            Favorite
            {
              isFavorite ? wFavIcon : bFavIcon
            }
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
