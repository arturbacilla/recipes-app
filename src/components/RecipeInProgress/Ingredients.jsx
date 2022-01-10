import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import loadIngredientStatus from './loadIngredients';

export default function Ingredients(props) {
  const { data, type, id } = props;
  const ingType = type === 'cocktail' ? 'drinks' : 'meals'; // ingredient Type
  const translate = ingType === 'drinks' ? 'cocktails' : 'meals';
  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const [checkedIng, setCheckedIng] = useState(inProgressRecipes[translate][id]); // checked ingredient

  const saveToLocalStorage = () => {
    // verifica se o state está com valor invalido e define um array vazio caso verdade.
    // sem essa verificação o saveIngredient() quebra.
    if (!checkedIng) {
      inProgressRecipes[translate] = { ...inProgressRecipes[translate], [id]: [] };
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
      setCheckedIng([]);
    } else {
      inProgressRecipes[translate] = {
        ...inProgressRecipes[translate],
        [id]: [...checkedIng],
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
    }
  };
  // salva os ingredientes com checked ativo no state checkedIng
  const saveIngredient = ({ target }) => {
    const { name, checked } = target;
    setCheckedIng((prevState) => {
      const NOT_FOUND = -1;
      const index = prevState.findIndex((e) => e[0] === name);
      if (index !== NOT_FOUND) {
        prevState[index][1] = checked;
        return [...prevState];
      }

      return [...prevState, [name, checked]];
    });
  };

  useEffect(() => {
    loadIngredientStatus(translate, id);
  });

  useEffect(() => {
    saveToLocalStorage();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkedIng]);

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
            <input
              type="checkbox"
              name={ `ingredient${i}` }
              id={ `ingredient${i}` }
              className="ingredient"
              onClick={ saveIngredient }
            />
            {
              // preenche o nome e quantidade do ingrediente e verifica se o retorno do measure é diferente de null
              `${data[ingType][0][e]} - ${
                data[ingType][0][listOfMeasures[i]] ? (
                  data[ingType][0][listOfMeasures[i]]) : ''
              }`
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
  id: PropTypes.string.isRequired,
};
