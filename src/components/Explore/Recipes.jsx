import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../Footer';
import Header from '../Header';
import fetchRecipe from '../../services/api';
import RecipesContext from '../../context/RecipesContext';

function ExploreRecipes({ recipeof }) {
  const { randomFoodOrDrink, setRandomFoodOrDrink } = useContext(RecipesContext);
  const [id, setId] = useState(0);

  const path = recipeof === 'meal'
    ? 'comidas'
    : 'bebidas';

  async function fetchRandom(type) {
    if (type === 'comidas') {
      const result = await fetchRecipe('meal', 'random');
      setRandomFoodOrDrink(result);
      console.log(result.meals[0].idMeal);
      setId(result.meals[0].idMeal);
    } else {
      const result = await fetchRecipe('cocktail', 'random');
      setRandomFoodOrDrink(result);
      console.log(result.drinks[0].idDrink);
      setId(result.drinks[0].idDrink);
    }
  }

  useEffect(() => {
    console.log(randomFoodOrDrink.length > 0);
  }, [randomFoodOrDrink]);

  // console.log(randomFoodOrDrink.meals[0]);
  return (
    <>
      {/* Source: https://www.digitalocean.com/community/tutorials/js-capitalizing-strings */}
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
            pathname: `/explorar/${path}/${id}`,
            state: { path },
          } }
        >
          {/* Mudar link depois /explorar/${path}/${id} */}
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
