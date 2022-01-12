import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import FiltersContext from '../../context/FiltersContext';
import RecipesContext from '../../context/RecipesContext';
import fetchRecipe from '../../services/api';
import './style.css';

function FilterByCategory({ apiType, originalData }) {
  const CAT_NUM = 5;
  const RECIPE_NUM = 12;
  const key = apiType === 'cocktail' ? 'drinks' : 'meals';
  const [filters] = useContext(FiltersContext);
  const { categories } = filters;
  const { setFetchedRecipes } = useContext(RecipesContext);
  const [clickedBtn, setClickedBtn] = useState('');

  const firstN = categories[key]
    .map((e) => e.strCategory)
    .slice(0, CAT_NUM);

  const getRecipesByCategory = async (keyword) => {
    const recipesByCategory = await fetchRecipe(apiType, 'category', keyword);
    return recipesByCategory[key].slice(0, RECIPE_NUM);
  };

  const handleClick = ({ target: { name } }) => {
    if (clickedBtn === name || name === 'All') {
      setFetchedRecipes(originalData);
      setClickedBtn('');
    } else {
      getRecipesByCategory(name).then((response) => {
        setFetchedRecipes(response);
        setClickedBtn(name);
      });
    }
  };

  return (
    <section className="button-container">
      <button
        type="button"
        data-testid="All-category-filter"
        name="All"
        onClick={ handleClick }
      >
        All
      </button>
      {!categories ? <span>Loading filters...</span> : (
        firstN.map((category, index) => (
          <button
            key={ index }
            type="button"
            name={ category }
            data-testid={ `${category}-category-filter` }
            onClick={ handleClick }
          >
            {category}
          </button>
        ))
      )}
    </section>
  );
}

FilterByCategory.propTypes = {
  apiType: PropTypes.string.isRequired,
  originalData: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default FilterByCategory;
