import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const [def, setDef] = useState('');

  return (
    <main>
      <RecipesContext.Provider value={ { def, setDef } }>
        { children }
      </RecipesContext.Provider>
    </main>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default RecipesProvider;
