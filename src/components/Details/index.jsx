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
  const [ingredients, setIngredients] = useState([]);
  const { location: { pathname } } = props;
  const prevPath = pathname.split('').slice(1, maxLength).join('');

  async function fetchRecipeById() {
    const { match: { params: { id } } } = props;
    const minDrink = 17;
    const endDrink = 15;
    const minMeal = 9;
    if (pathname.includes('comidas')) {
      const recipe = await fetchRecipe('meal', 'id', id);
      setRandomFood(recipe);
      setIngredients(Object.values(recipe.meals[0]).splice(minMeal, endDrink));
    } else {
      const recipe = await fetchRecipe('cocktail', 'id', id);
      setRandomDrink(recipe);
      setIngredients(Object.values(recipe.drinks[0]).splice(minDrink, endDrink));
      // Object.values(ingredients).splice(17, 15)
    }
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
        onClick={ () => console.log(randomDrink.drinks[0]) }
      >
        Clique em mim!
      </button>

      { (randomDrink !== '') ? ( // fazer um componente pra bebida e outro para as comidas
        <DrinksDetails drinkInfo={ randomDrink.drinks[0] } ingredients={ ingredients } />
      ) : <div /> }

      { (randomFood !== '') ? ( // fazer um componente pra bebida e outro para as comidas
        <MealsDetails mealInfo={ randomFood.meals[0] } ingredients={ ingredients } />
      ) : <div>loading...</div> }
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
