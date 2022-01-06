import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import FiltersContext from '../../context/FiltersContext';

function FilterByCategory({ apiType }) {
  const CAT_NUM = 5;
  const key = apiType === 'cocktail' ? 'drinks' : 'meals';
  const [filters] = useContext(FiltersContext);
  const { categories } = filters;
  const firstN = categories[key]
    .map((e) => e.strCategory)
    .slice(0, CAT_NUM);

  return (
    <section>
      <button
        type="button"
        data-testid="all-category-filter"
      >
        All
      </button>
      {!categories ? <span>Loading filters...</span> : (
        firstN.map((category, index) => (
          <button
            key={ index }
            type="button"
            data-testid={ `${category}-category-filter` }
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
};

export default FilterByCategory;
