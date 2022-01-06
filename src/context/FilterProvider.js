import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import FiltersContext from './FiltersContext';
import { fetchLists } from '../services/api';

const INITIAL_FILTERS = {
  categories: {
    meals: [],
    drinks: [],
  },
  filteredData: [],
};

function FilterProvider({ children }) {
  const [filters, setFilter] = useState({
    ...INITIAL_FILTERS,
    setFilter: () => {},
  });

  const fillCategories = async () => {
    const fetchedMealsCat = await fetchLists('meal');
    const fetchedDrinksCat = await fetchLists('cocktail');
    setFilter({
      ...filters,
      categories: {
        meals: fetchedMealsCat.meals,
        drinks: fetchedDrinksCat.drinks,
      },
    });
  };

  useEffect(() => {
    fillCategories();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FiltersContext.Provider value={ [filters, setFilter] }>
      {children}
    </FiltersContext.Provider>
  );
}

FilterProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FilterProvider;
