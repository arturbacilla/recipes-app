import PropTypes from 'prop-types';
import React, { useState } from 'react';

export default function DrinksDetails({ drinkInfo, ingredients }) {
  const [index] = useState(0);
  const { strDrink, strDrinkThumb, idDrink, strCategory, strInstructions } = drinkInfo;

  function filterIngredients(array) {
    const filtered = [];
    array.forEach((curr) => {
      if (curr !== null) {
        filtered.push(curr);
      }
    });

    return filtered;
  }

  return (
    <div>
      <h4 data-testid="recipe-title">{`Name: ${strDrink}`}</h4>
      <img
        data-testid="recipe-photo"
        src={ strDrinkThumb }
        alt=""
        style={ { width: '200px' } }
      />
      <h4>{`Id: ${idDrink}`}</h4>
      <button type="button" data-testid="share-btn">Compartilhar</button>
      <button type="button" data-testid="favorite-btn">Favoritar</button>
      <h4
        data-testid="recipe-category"
      >
        {`Categoria: ${strCategory}`}
      </h4>
      <h5>Ingredientes</h5>
      <ul data-testid="recipe-category">
        {filterIngredients(ingredients).map((ingr) => (
          <li
            data-testid={
              `${index}-ingredient-name-and-measure`
            }
            key={ ingr }
          >
            {`${ingr}`}
          </li>
        ))}
      </ul>
      <h5>Instruções:</h5>
      <p data-testid="instructions">{`${strInstructions}`}</p>
      <h6>Receitas Recomendadas:</h6>
      <ul
        data-testid={
          `${index}-recomendation-card`
        }
      >
        <li>Teste</li>
      </ul>

      <button
        type="button"
        onClick={ () => console.log(drinkInfo) }
        data-testid="start-recipe-btn"
      >
        Iniciar Receita
      </button>
    </div>
  );
}

DrinksDetails.propTypes = {
  drinkInfo: PropTypes.shape({
    idDrink: PropTypes.string.isRequired,
    strCategory: PropTypes.string.isRequired,
    strDrink: PropTypes.string.isRequired,
    strDrinkThumb: PropTypes.string.isRequired,
    strInstructions: PropTypes.string.isRequired,
  }).isRequired,
  ingredients: PropTypes.string.isRequired,
};
