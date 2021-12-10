import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const [renderBar, setRenderBar] = useState(false);

  const valores = { renderBar, setRenderBar };
  return (
    <main>
      <RecipesContext.Provider value={ valores }>
        { children }
      </RecipesContext.Provider>
    </main>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default RecipesProvider;
