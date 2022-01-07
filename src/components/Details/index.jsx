import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import fetchRecipe from '../../services/api';
import DrinksDetails from './DrinksDetails';
import MealsDetails from './MealsDetails';

const maxLength = 8;

export default function Details(props) {
  const [randomFood, setRandomFood] = useState('');
  const [randomDrink, setRandomDrink] = useState('');
  const [ingredientsKeys, setIngredientsKeys] = useState([]);
  const [measures, setMeasures] = useState([]);
  const { location: { pathname } } = props;
  const prevPath = pathname.split('').slice(1, maxLength).join('');

  async function fetchRecipeById() {
    const { match: { params: { id } } } = props;
    if (pathname.includes('comidas')) {
      const recipe = await fetchRecipe('meal', 'id', id);
      setRandomFood(recipe);
      setIngredientsKeys(Object.keys(recipe.meals[0]).filter(
        (key) => key.includes('strIngredient'),
      ));
      setMeasures(Object.keys(recipe.meals[0]).filter(
        (key) => key.includes('strMeasure'),
      ));
    } else {
      const recipe = await fetchRecipe('cocktail', 'id', id);
      setRandomDrink(recipe);
      setIngredientsKeys(Object.keys(recipe.drinks[0]).filter(
        (key) => key.includes('strIngredient'),
      ));
      setMeasures(Object.keys(recipe.drinks[0]).filter(
        (key) => key.includes('strMeasure'),
      ));
      // Object.values(ingredients).splice(17, 15)
    }
  }

  function filterMeasures(array) {
    const filtered = [];
    array.forEach((curr) => {
      if (curr !== null && curr !== '') {
        filtered.push(curr);
      }
    });

    return filtered;
  }

  useEffect(() => {
    fetchRecipeById();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(randomDrink === '');

  return (
    <div>
      <Link to={ `/${prevPath}/` }>
        Voltar
      </Link>
      <h2>Detalhes</h2>
      <button
        type="button"
        onClick={ () => console.log(randomFood.meals[0]) }
      >
        Clique em mim!
      </button>

      { (randomDrink !== '') ? ( // fazer um componente pra bebida e outro para as comidas
        <DrinksDetails
          drinkInfo={ randomDrink.drinks[0] }
          ingredientsKeys={ ingredientsKeys }
          measuresKeys={ filterMeasures(measures) }
        />
      ) : <div /> }

      { (randomFood !== '') ? ( // fazer um componente pra bebida e outro para as comidas
        <MealsDetails
          mealInfo={ randomFood.meals[0] }
          ingredientsKeys={ ingredientsKeys }
          measuresKeys={ measures }
        />
      ) : <div /> }
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
