import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import shareIcon from '../../images/shareIcon.svg';
import './style.css';

function CardDone({ index, recipe, apiType }) {
  const varType = apiType === 'cocktail' ? 'Drink' : 'Meal';
  const vars = [`str${varType}Thumb`, `str${varType}`, `id${varType}`];
  const translated = apiType === 'cocktail' ? 'bebidas' : 'comidas';
  const [clicked, setClicked] = useState(false);

  const getFirstList = (firstList) => {
    const LIST_SIZE = 2;
    if (typeof (firstList) === 'object') {
      return firstList;
    }
    return (firstList ? (firstList.split(',').slice(0, LIST_SIZE)) : []);
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
    </article>
  );
}

CardDone.propTypes = {
  index: PropTypes.number.isRequired,
  apiType: PropTypes.string.isRequired,
  recipe: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default CardDone;
