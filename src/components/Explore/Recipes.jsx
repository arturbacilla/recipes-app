import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../Footer';
import Header from '../Header';

function ExploreRecipes({ recipeof }) {
  const path = recipeof === 'meal'
    ? 'comidas'
    : 'bebidas';
  return (
    <>
      <Header name={ `Explorar ${path}` } />
      <section>
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
      </section>
      <Footer />
    </>
  );
}

ExploreRecipes.propTypes = {
  recipeof: PropTypes.string.isRequired,
};

export default ExploreRecipes;
