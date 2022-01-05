import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import RecipesContext from '../../context/RecipesContext';

export default function Details(props) {
  const { randomFoodOrDrink } = useContext(RecipesContext);
  const [randomFood, setRandomFood] = useState([]);
  // const [randomDrink, setRandomDrink] = useState([]);
  const { history: { location: { state: { path } } } } = props;

  useEffect(() => {
    if (randomFoodOrDrink.meals !== 'undefined') {
      setRandomFood(randomFoodOrDrink.meals);
    }
    console.log(`randomFoodOrDrink: ${randomFoodOrDrink.meals}`);
  }, [randomFoodOrDrink, randomFood]);

  console.log(`randomFood: ${randomFood}`);

  return (
    <div>
      <Link to={ `/explorar/${path}/` }>
        Voltar
      </Link>
      <h2>Detalhes</h2>
      { randomFood !== 'undefined' && <h3>{`Nome: ${randomFood}`}</h3> }
    </div>
  );
}

Details.propTypes = {
  // props: PropTypes.shape({
  //   history: PropTypes.shape({
  //     location: PropTypes.shape({
  //       state: PropTypes.shape({
  //         path: PropTypes.string,
  //       }),
  //     }),
  //   }),
  // }),
  history: {
    location: PropTypes.string.isRequired,
  }.isRequired,
};
