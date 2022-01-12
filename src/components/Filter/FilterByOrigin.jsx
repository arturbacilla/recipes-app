import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import FiltersContext from '../../context/FiltersContext';
import RecipesContext from '../../context/RecipesContext';
import fetchRecipe from '../../services/api';

function FilterByOrigin({ originalData, apiType }) {
  const RECIPE_NUM = 12;
  const { setFetchedRecipes } = useContext(RecipesContext);
  const [filters] = useContext(FiltersContext);
  const { areas } = filters;
  const [selectedOrigin, setOrigin] = useState('All');

  const getRecipesByArea = async (keyword) => {
    const recipesByArea = await fetchRecipe(apiType, 'origin', keyword);
    return recipesByArea.meals.slice(0, RECIPE_NUM);
  };

  const handleChange = ({ target: { value } }) => {
    if (selectedOrigin === value || value === 'All') {
      setFetchedRecipes(originalData);
      setOrigin('All');
    } else {
      getRecipesByArea(value).then((response) => {
        setFetchedRecipes(response);
        setOrigin(value);
      });
    }
  };

  return (
    <section className="origin-dropdown">
      {!areas.length ? <span>Loading areas...</span> : (
        <select
          data-testid="explore-by-area-dropdown"
          name="Origin"
          id="Origin"
          onChange={ handleChange }
        >
          <option
            data-testid="All-option"
            value="All"
          >
            All
          </option>
          {areas.map((area) => (
            <option
              data-testid={ `${area}-option` }
              key={ area }
              value={ area }
            >
              {area}
            </option>
          ))}
        </select>
      )}
    </section>
  );
}

FilterByOrigin.propTypes = {
  apiType: PropTypes.string.isRequired,
  originalData: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default FilterByOrigin;
