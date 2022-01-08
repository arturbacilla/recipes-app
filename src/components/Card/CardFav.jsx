import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import shareIcon from '../../images/shareIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

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
    <article data-testid={ `${index}-recipe-card` }>
      <Link to={ `/${translated}/${recipe.id}` }>
        <img
          data-testid={ `${index}-horizontal-image` }
          src={ recipe.image }
          alt={ `Imagem de ${recipe[vars[1]]}` }
          width="100"
          heigth="100"
        />
        <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
      </Link>
      { apiType === 'cocktail' ? (
        <p data-testid={ `${index}-horizontal-top-text` }>
          {recipe.alcoholicOrNot}
        </p>
      ) : (
        <p data-testid={ `${index}-horizontal-top-text` }>

          {`${recipe.area} - ${recipe.category}`}

        </p>)}

      <p data-testid={ `${index}-horizontal-done-date` }>
        {recipe.doneDate}
      </p>
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
        />

      </button>
      { clicked ? <span>Link copiado!</span> : null}

      <p>
        Tags:
        {getFirstList(recipe.tags).map((el) => (
          <p key={ el } data-testid={ `${index}-${el}-horizontal-tag` }>
            {el}
          </p>))}
      </p>
      <button type="button" name={ recipe.id } onClick={ removeFav }>
        <img
          src={ blackHeartIcon }
          alt="Desfavoritar"
          name={ recipe.id }
          data-testid={ `${index}-horizontal-favorite-btn` }
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
