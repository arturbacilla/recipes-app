import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../Footer';
import Header from '../Header';
import fetchRecipe from '../../services/api';

function ExploreRecipes({ recipeof }) {
  const [id, setId] = useState(0);

  const path = recipeof === 'meal'
    ? 'comidas'
    : 'bebidas';

  async function fetchRandom(type) {
    if (type === 'comidas') {
      const result = await fetchRecipe('meal', 'random');
      // console.log(result);
      setId(result.meals[0].idMeal);
    } else {
      const result = await fetchRecipe('cocktail', 'random');
      // console.log(result.drinks[0].idDrink);
      setId(result.drinks[0].idDrink);
    }
  }

  useEffect(() => {
    fetchRandom(path);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/* Source: https://www.digitalocean.com/community/tutorials/js-capitalizing-strings */}
      <Header
        name={ `Explorar ${path.replace(/^\w/, (l) => l.toUpperCase())}` }
        search={ false }
      />
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
            pathname: `/${path}/${id}`,
            state: { path },
          } }
        >
          {/* Mudar link depois /explorar/${path}/${id} */}
          {/* {
            pathname: `/explorar/${path}/${id}`,
            state: { path },
          } */}
          <button
            type="button"
            data-testid="explore-surprise"
            onClick={ () => console.log(id) }
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
