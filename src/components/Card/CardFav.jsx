import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import shareIcon from '../../images/shareIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import './style.css';

function CardFav({ index, recipe, apiType, stFav }) {
  const varType = apiType === 'cocktail' ? 'Drink' : 'Meal';
  const vars = [`str${varType}Thumb`, `str${varType}`, `id${varType}`];
  const translated = apiType === 'cocktail' ? 'bebidas' : 'comidas';
  const [clicked, setClicked] = useState(false);
  console.log(recipe);

  const getFirstList = (firstList) => {
    const LIST_SIZE = 2;
    if (typeof (firstList) === 'object') {
      return firstList;
    }
    return (firstList ? (firstList.split(',').slice(0, LIST_SIZE)) : []);
  };

  const removeFav = ({ target }) => {
    const { name } = target;
    const favList = JSON.parse(localStorage.getItem('favoriteRecipes'));
    console.log(name);
    const rmList = favList.filter((el) => el.id !== name);
    localStorage.setItem('favoriteRecipes', JSON.stringify(rmList));
    stFav(rmList);
  };

  return (
    <article data-testid={ `${index}-recipe-card` } className="card-diverse">
      <Link to={ `/${translated}/${recipe.id}` } className="button-link">
        <img
          data-testid={ `${index}-horizontal-image` }
          src={ recipe.image }
          alt={ `Imagem de ${recipe[vars[1]]}` }
          width="110"
          heigth="110"
        />
        <span
          data-testid={ `${index}-horizontal-name` }
          className="meal-name"
        >
          {recipe.name}

        </span>
      </Link>
      <div className="button-info">
        { apiType === 'cocktail' ? (
          <span data-testid={ `${index}-horizontal-top-text` }>
            {recipe.alcoholicOrNot}
          </span>
        ) : (
          <span data-testid={ `${index}-horizontal-top-text` }>

            {`${recipe.area} - ${recipe.category}`}

          </span>)}

        <span data-testid={ `${index}-horizontal-done-date` }>
          {recipe.doneDate}
        </span>
        <span className="button-tags">
          Tags:
          {getFirstList(recipe.tags).map((el) => (
            <span key={ el } data-testid={ `${index}-${el}-horizontal-tag` }>
              {el}
            </span>))}
        </span>
        <button
          type="button"
          onClick={ () => {
            setClicked((teste) => !teste);
            navigator.clipboard.writeText(`http://localhost:3000/comidas/${recipe.id}`);
          } }
        >
          <img
            src={ shareIcon }
            alt="compartilhar"
            data-testid={ `${index}-horizontal-share-btn` }
            className="button-share"
          />

        </button>
        { clicked ? <span>Link copiado!</span> : null}
      </div>
      <button
        type="button"
        name={ recipe.id }
        onClick={ removeFav }
        className="button-fav"
      >
        <img
          src={ blackHeartIcon }
          alt="Desfavoritar"
          name={ recipe.id }
          data-testid={ `${index}-horizontal-favorite-btn` }
          className="button-fav"
        />
      </button>
    </article>
  );
}

CardFav.propTypes = {
  apiType: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  recipe: PropTypes.objectOf(PropTypes.any).isRequired,
  stFav: PropTypes.func.isRequired,
};

export default CardFav;
