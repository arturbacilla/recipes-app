import PropTypes from 'prop-types';
import React from 'react';
// import { Link } from 'react-router-dom';
import { getIngredientImg } from '../../services/api';

function IngredientCard({ index, ingredient, apiType }) {
  const key = apiType === 'cocktail' ? 'strIngredient1' : 'strIngredient';
  const ingredientImg = getIngredientImg(apiType, ingredient[key]);
  return (

    // <Link to={ `/${translated}/${ingredient[vars[2]]}` }>
    <article data-testid={ `${index}-ingredient-card` }>
      <img
        data-testid={ `${index}-card-img` }
        src={ ingredientImg }
        alt={ `Imagem de ${ingredient[key]}` }
        width="100"
        heigth="100"
      />
      <span data-testid={ `${index}-card-name` }>{ingredient[key]}</span>
    </article>
    // </Link>
  );
}

IngredientCard.propTypes = {
  index: PropTypes.number.isRequired,
  apiType: PropTypes.string.isRequired,
  ingredient: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default IngredientCard;
