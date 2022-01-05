import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import RecipesContext from '../../context/RecipesContext';

export default function Details(props) {
  const { randomFoodOrDrink, setRandomFoodOrDrink } = useContext(RecipesContext);
  const [randomFood, setRandomFood] = useState([]);
  const [randomDrink, setRandomDrink] = useState([]);
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
      { randomFood !== 'undefined' && <h3>{`Nome: `}</h3> }
    </div>
  );
}
