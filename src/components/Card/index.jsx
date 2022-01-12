import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

function Card({ index, recipe, apiType }) {
  const varType = apiType === 'cocktail' ? 'Drink' : 'Meal';
  const vars = [`str${varType}Thumb`, `str${varType}`, `id${varType}`];
  const translated = apiType === 'cocktail' ? 'bebidas' : 'comidas';
  return (
    <Link to={ `/${translated}/${recipe[vars[2]]}` } className="card-container">
      <article data-testid={ `${index}-recipe-card` } className="recommend-thumb">
        <img
          data-testid={ `${index}-card-img` }
          src={ recipe[vars[0]] }
          alt={ `Imagem de ${recipe[vars[1]]}` }
        />
        <section className="recipe-info">
          <span className="recipe-category">{recipe.strCategory}</span>
          <span
            className={ `recipe-name ${apiType}-name` }
            data-testid={ `${index}-card-name` }
          >
            {recipe[vars[1]]}

          </span>
        </section>
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
