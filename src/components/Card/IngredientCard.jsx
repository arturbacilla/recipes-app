import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../../context/RecipesContext';
import fetchRecipe, { getIngredientImg } from '../../services/api';
import './style.css';

function IngredientCard({ index, ingredient, apiType }) {
  const key = apiType === 'cocktail' ? 'strIngredient1' : 'strIngredient';
  const ingredientImg = getIngredientImg(apiType, ingredient[key]);
  const pluralized = apiType === 'cocktail' ? 'drinks' : 'meals';
  const translated = apiType === 'cocktail' ? 'bebidas' : 'comidas';
  const apiFix = apiType === 'cocktail' ? 'strIngredient1' : 'strIngredient';
  const history = useHistory();
  const { setIngredientsFetch, setFetchedRecipes } = useContext(RecipesContext);

  const fetchByIngredient = async () => {
    const LIST_SIZE = 12;
    const firstList = await fetchRecipe(apiType, 'ingredient', ingredient[apiFix]);
    return firstList[pluralized].slice(0, LIST_SIZE);
  };

  const handleClick = () => {
    fetchByIngredient().then((response) => {
      setFetchedRecipes(response);
      setIngredientsFetch(true);
    }).finally(() => {
      history.push(`/${translated}/`);
      setIngredientsFetch(false);
    });
  };

  return (
    <button
      data-testid={ `${index}-ingredient-card` }
      className="recommend-thumb"
      type="button"
      onClick={ handleClick }
    >
      <img
        data-testid={ `${index}-card-img` }
        src={ ingredientImg }
        alt={ `Imagem de ${ingredient[key]}` }
        width="100"
        heigth="100"
      />
      <span
        data-testid={ `${index}-card-name` }
        className={ `recipe-name ${apiType}-name` }
      >
        {ingredient[key]}

      </span>
    </button>
  );
}

IngredientCard.propTypes = {
  index: PropTypes.number.isRequired,
  apiType: PropTypes.string.isRequired,
  ingredient: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default IngredientCard;
