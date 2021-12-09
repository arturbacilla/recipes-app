import React from 'react';
import { Link } from 'react-router-dom';
// import Header from '../Header';

function ExploreRecipes({ recipeof }) {
  const path = recipeof === 'meal'
    ? 'comidas'
    : 'bebidas';
  return (
    <main>
      {/* <Header /> */}
      <Link to={ `/explorar/${path}/ingredientes` }>
        <button
          type="button"
          data-testid="explore-by-ingredient"
        >
          Por ingredientes
        </button>
      </Link>
      {
        recipeof === 'meal'
        && (
          <Link to={ `/explorar/${path}/area` }>
            <button
              type="button"
              data-testid="explore-by-area"
            >
              Por Local de Origem
            </button>
          </Link>)
      }
      <Link to="/">
        {/* Mudar link depois */}
        <button
          type="button"
          data-testid="explore-surprise"
        >
          Me surpreenda!
        </button>
      </Link>
    </main>
  );
}

export default ExploreRecipes;
