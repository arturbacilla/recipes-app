import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

export default function FinishButton({ acRecipe }) {
  // const { data, type, id } = props;
  // const ingType = type === 'cocktail' ? 'drinks' : 'meals'; // ingredient Type
  // const translate = ingType === 'drinks' ? 'cocktails' : 'meals';
  // const [isDisabled, setIsDisabled] = useState(true);
  const [isRedirected, setIsRedirected] = useState(false);
  // const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));

  // const getAllValidIngredients = () => {
  //   const listOfIngredients = Object.keys(data[ingType][0])
  //     .filter((e) => e.includes('strIngredient'));
  //   const validIngredients = listOfIngredients.filter((e) => data[ingType][0][e]);
  //   return validIngredients;
  // };
  // // verifica se a quantidade de ingredientes marcados como true é igual
  // // a quantidade de ingredientes existentes.
  // const verifyAllChecks = () => {
  //   const validIngredients = getAllValidIngredients().length;
  //   const checkedIngredients = inProgressRecipes[translate][id]
  //     .filter((e) => e[1] !== false).length;
  //   if (validIngredients === checkedIngredients) {
  //     setIsDisabled(false);
  //   } else {
  //     setIsDisabled(true);
  //   }
  // };

  // useEffect(() => {
  //   verifyAllChecks();
  //   console.log(isDisabled);
  // }, []);

  return (
    <div>
      {
        isRedirected ? (<Redirect to="/receitas-feitas" />) : (
          <button
            type="button"
            id="finishBtn-Inprogress"
            data-testid="finish-recipe-btn"
            onClick={ () => {
              let local = JSON.parse(localStorage.getItem('doneRecipes'));
              console.log(local);
              local = local.push(acRecipe);
              localStorage.setItem('doneRecipes', JSON.stringify(local));
              setIsRedirected(true);
            } }
            // disabled={ isDisabled }
          >
            Finish Recipe
          </button>)
      }
    </div>
  );
}

// FinishButton.propTypes = {
//   data: PropTypes.objectOf(PropTypes.array).isRequired,
//   type: PropTypes.string.isRequired,
//   id: PropTypes.string.isRequired,
// };
