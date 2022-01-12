import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../Footer';
import Header from '../Header';
import fetchRecipe from '../../services/api';
import './style.css';
import searchIngredient from '../../images/icons/search_ingredients.png';
import searchLocation from '../../images/icons/search_location.png';
import searchSurprise from '../../images/icons/search_surprise.png';

function ExploreRecipes({ recipeof }) {
  const [id, setId] = useState(0);

  const path = recipeof === 'meal'
    ? 'comidas'
    : 'bebidas';
  const apiType = recipeof === 'meal' ? 'meal' : 'cocktail';

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
    <div className="explore-wrap">
      {/* Source: https://www.digitalocean.com/community/tutorials/js-capitalizing-strings */}
      <Header
        name={ `Explorar ${path.replace(/^\w/, (l) => l.toUpperCase())}` }
        search={ false }
        apiType={ apiType }
      />
      <section className="explore-main">
        <Link to={ `/explorar/${path}/ingredientes` } title="Icons made by Freepik">
          <img src={ searchIngredient } alt="Ícone de ingredientes" className="icon" />
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
            <Link to={ `/explorar/${path}/area` } title="Icons made by Freepik">
              <img src={ searchLocation } alt="Ícone de localização" className="icon" />
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
          <img src={ searchSurprise } alt="Ícone de supresea" className="icon" />
          <button
            type="button"
            data-testid="explore-surprise"
            onClick={ () => console.log(id) }
          >
            Me Surpreenda!
          </button>
        </Link>
      </section>
      <Footer apiType={ apiType } />
    </div>
  );
}

ExploreRecipes.propTypes = {
  recipeof: PropTypes.string.isRequired,
};

export default ExploreRecipes;
