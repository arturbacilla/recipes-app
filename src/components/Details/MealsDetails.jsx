import PropTypes from 'prop-types';
import React, { useState } from 'react';

export default function MealsDetails({ mealInfo, ingredients, measures }) {
  const [index] = useState(0);
  const {
    strMeal,
    strMealThumb,
    idMeal,
    strCategory,
    strInstructions,
    strYoutube,
  } = mealInfo;

  function filterIngredients(array) {
    const filtered = [];
    array.forEach((curr) => {
      if (curr !== null && curr !== '') {
        filtered.push(curr);
      }
    });

    return filtered;
  }

  return (
    <div>
      <h4 data-testid="recipe-title">{`Name: ${strMeal}`}</h4>
      <img
        data-testid="recipe-photo"
        src={ strMealThumb }
        alt=""
        style={ { width: '200px' } }
      />
      <h4>{`Id: ${idMeal}`}</h4>
      <button type="button" data-testid="share-btn">Compartilhar</button>
      <button type="button" data-testid="favorite-btn">Favoritar</button>
      <h4
        data-testid="recipe-category"
      >
        {`Categoria: ${strCategory}`}
      </h4>
      <h5>Vídeo:</h5>
      <video
        src={ strYoutube }
        data-testid="video"
        width="400"
        height="300"
        controls="controls"
        autoPlay="no"
      >
        <track kind="captions" />
      </video>
      track
      <h5>Ingredientes</h5>
      <ul data-testid="recipe-category">
        {filterIngredients(ingredients).map((ingr, i) => (
          <li
            data-testid={
              `${i}-ingredient-name-and-measure`
            }
            key={ ingr }
          >
            {`${ingr} - ${measures[i]}`}
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
        onClick={ () => console.log(measures) }
        data-testid="start-recipe-btn"
      >
        Iniciar Receita
      </button>
    </div>
  );
}

MealsDetails.propTypes = {
  ingredients: PropTypes.string.isRequired,
  mealInfo: PropTypes.shape({
    idMeal: PropTypes.string.isRequired,
    strCategory: PropTypes.string.isRequired,
    strInstructions: PropTypes.string.isRequired,
    strMeal: PropTypes.string.isRequired,
    strMealThumb: PropTypes.string.isRequired,
    strYoutube: PropTypes.string.isRequired,
  }).isRequired,
  measures: PropTypes.string.isRequired,
};
