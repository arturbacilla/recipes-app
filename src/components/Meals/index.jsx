import React, { useContext } from 'react';
import RecipesContext from '../../context/RecipesContext';
import Footer from '../Footer';
import Header from '../Header';
import SearchBar from '../Header/SearchBar';

function Meals() {
  const { renderBar } = useContext(RecipesContext);

  return (
    <div>
      <Header name="COMIDAS" />
      {renderBar ? <SearchBar /> : null}
      <h1>PÁGINA DE COMIDAS</h1>
      <Footer />
    </div>
  );
}

export default Meals;
