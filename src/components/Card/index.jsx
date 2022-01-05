import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

function Card({ index, recipe, apiType }) {
  const varType = apiType === 'cocktail' ? 'Drink' : 'Meal';
  const vars = [`str${varType}Thumb`, `str${varType}`, `id${varType}`];
  const translated = apiType === 'cocktail' ? 'bebidas' : 'comidas';
  return (
    <Link to={ `/${translated}/${recipe[vars[2]]}` }>
      <article data-testid={ `${index}-recipe-card` }>
        <img
          data-testid={ `${index}-card-img` }
          src={ recipe[vars[0]] }
          alt={ `Imagem de ${recipe[vars[1]]}` }
          width="100"
          heigth="100"
        />
        <span data-testid={ `${index}-card-name` }>{recipe[vars[1]]}</span>
      </article>
    </Link>
  );
}

Card.propTypes = {
  index: PropTypes.number.isRequired,
  apiType: PropTypes.string.isRequired,
  recipe: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Card;
