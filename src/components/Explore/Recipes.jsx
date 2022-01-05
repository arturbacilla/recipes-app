import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../Footer';
import Header from '../Header';
import fetchRecipe from '../../services/api';
import RecipesContext from '../../context/RecipesContext';

function ExploreRecipes({ recipeof }) {
  const {randomFoodOrDrink, setRandomFoodOrDrink} = useContext(RecipesContext);

  const path = recipeof === 'meal'
    ? 'comidas'
    : 'bebidas';

  async function fetchRandom(type) {
    if (type === 'comidas') {
      const result = await fetchRecipe('meal', 'random');
      setRandomFoodOrDrink(result);
    } else {
      const result = await fetchRecipe('cocktail', 'random');
      setRandomFoodOrDrink(result);
    }
  }
  return (
    <>
      <Header name={ `Explorar ${path.replace(/^\w/, (l) => l.toUpperCase())}` } />
      <section>
        <Link to={ `/explorar/${path}/ingredientes` }>
          <button
            type="button"
            data-testid="explore-by-ingredient"
          >
            Por Ingredientes
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
        <Link
          to={ {
            pathname: `/explorar/${path}/random`,
            state: { path },
          } }
        >
          {/* Mudar link depois /explorar/${path}/random */}
          <button
            type="button"
            data-testid="explore-surprise"
            onClick={ () => { fetchRandom(path); } }
          >
            Me Surpreenda!
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
