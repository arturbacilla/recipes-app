import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import FiltersContext from './FiltersContext';
import { fetchLists } from '../services/api';

const INITIAL_FILTERS = {
  categories: {
    meals: [],
    drinks: [],
  },
  areas: [],
};

function FilterProvider({ children }) {
  const [filters, setFilter] = useState({
    ...INITIAL_FILTERS,
    setFilter: () => {},
  });

  const fillFilters = async () => {
    const fetchedMealsCat = await fetchLists('meal');
    const fetchedDrinksCat = await fetchLists('cocktail');
    const fetchedAreas = await fetchLists('meal', 'area');
    setFilter({
      ...filters,
      categories: {
        meals: fetchedMealsCat.meals,
        drinks: fetchedDrinksCat.drinks,
      },
      areas: fetchedAreas.meals.map((area) => area.strArea),
    });
  };

  useEffect(() => {
    fillFilters();
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
