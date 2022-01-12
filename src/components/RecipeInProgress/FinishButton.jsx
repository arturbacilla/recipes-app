import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

export default function FinishButton(props) {
  const { data, type } = props;
  // const ingType = type === 'cocktail' ? 'drinks' : 'meals'; // ingredient Type
  // const translate = ingType === 'drinks' ? 'cocktails' : 'meals';
  // const [isDisabled, setIsDisabled] = useState(true);
  const [isRedirected, setIsRedirected] = useState(false);
  const typeOfKeys = [
    ['strDrink', 'strDrinkThumb',
      'strCategory', 'idDrink', '', 'strAlcoholic', 'strTags'],
    ['strMeal', 'strMealThumb', 'strCategory', 'idMeal', 'strArea', '', 'strTags']];
  const headerType = type === 'cocktail' ? 'drinks' : 'meals';
  const headerData = headerType === 'drinks' ? typeOfKeys[0] : typeOfKeys[1];
  // const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const date = new Date();
  const saveDoneRecipe = {
    id: data[headerType][0][headerData[3]],
    type: headerType === 'drinks' ? 'bebida' : 'comida',
    area: data[headerType][0][headerData[4]] ? data[headerType][0][headerData[4]] : '',
    category: data[headerType][0][headerData[2]],
    alcoholicOrNot: data[headerType][0][headerData[5]] ? (
      data[headerType][0][headerData[5]]) : '',
    name: data[headerType][0][headerData[0]],
    image: data[headerType][0][headerData[1]],
    doneDate: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
    tags: data[headerType][0][headerData[6]] ? (
      data[headerType][0][headerData[6]]) : '',
  };

  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));

  return (
    <div>
      {
        isRedirected ? (<Redirect to="/receitas-feitas" />) : (
          <button
            type="button"
            id="finishBtn-Inprogress"
            data-testid="finish-recipe-btn"
            onClick={ () => {
              const local = [...doneRecipes, saveDoneRecipe];
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

FinishButton.propTypes = {
  data: PropTypes.objectOf(PropTypes.array).isRequired,
  type: PropTypes.string.isRequired,
  // id: PropTypes.string.isRequired,
};

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
