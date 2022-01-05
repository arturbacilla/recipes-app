import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import fetchRecipe from '../../services/api';

export default function Details(props) {
  const [randomFood, setRandomFood] = useState([]);
  const [randomDrink, setRandomDrink] = useState([]);
  const { location: { pathname } } = props;

  async function fetchRecipeById() {
    const { match: { params: { id } } } = props;
    if (pathname.includes('comidas')) {
      const recipe = await fetchRecipe('meal', 'id', id);
      setRandomFood(recipe);
    } else {
      const recipe = await fetchRecipe('cocktail', 'id', id);
      setRandomDrink(recipe);
    }
  }

  useEffect(() => {
    fetchRecipeById();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // console.log(path);

  return (
    <div>
      {/* <Link to={ `/explorar/${path}/` }>
        Voltar
      </Link> */}
      <h2>Detalhes</h2>
      <button
        type="button"
        onClick={ () => console.log(randomFood, randomDrink) }
      >
        Clique em mim!
      </button>
    </div>
  );
}

Details.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};
