import React from 'react';
import PropTypes from 'prop-types';

export default function Ingredients(props) {
  const { data, type } = props;
  const ingType = type === 'cocktail' ? 'drinks' : 'meals'; // ingredient Type

  const fillIngredients = () => {
    const listOfIngredients = Object.keys(data[ingType][0])
      .filter((e) => e.includes('strIngredient'));
    const listOfMeasures = Object.keys(data[ingType][0])
      .filter((e) => e.includes('strMeasure'));

    const checkbox = [];
    listOfIngredients.forEach((e, i) => {
      if (data[ingType][0][e]) {
        const ingredient = (
          <label
            htmlFor={ `ingredient${i}` }
            key={ i }
            data-testid={ `${i}-ingredient-step` }
          >
            <input type="checkbox" name={ `ingredient${i}` } id={ `ingredient${i}` } />
            {
              `${data[ingType][0][e]} - ${data[ingType][0][listOfMeasures[i]]}`
            }
          </label>);
        checkbox.push(ingredient);
      }
    });
    return checkbox;
  };

  return (
    <section>
      <h2>Ingredients</h2>
      <div className="recipe-ingredients">{ fillIngredients() }</div>
    </section>
  );
}

Ingredients.propTypes = {
  data: PropTypes.objectOf(PropTypes.array).isRequired,
  type: PropTypes.string.isRequired,
};
