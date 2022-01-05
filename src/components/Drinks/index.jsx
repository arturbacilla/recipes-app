import React, { useContext } from 'react';
import Footer from '../Footer';
import Header from '../Header';
import RecipesContext from '../../context/RecipesContext';
import SearchBar from '../Header/SearchBar';

function Drinks() {
  const { renderBar } = useContext(RecipesContext);

  return (
    <div>
      <Header name="Bebidas" search />
      {renderBar ? <SearchBar apiType="cocktail" /> : null}
      <Footer />
    </div>
  );
}

export default Drinks;
