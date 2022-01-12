import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from '../Header';
import Footer from '../Footer';
import { fetchLists } from '../../services/api';
import IngredientCard from '../Card/IngredientCard';

function ExploreByIngredients({ apiType }) {
  const INGREDIENTS_NUM = 12;
  const [ingredients, setIngredients] = useState([]);
  const key = apiType === 'cocktail' ? 'drinks' : 'meals';

  const getIngredients = async () => {
    const ingredientList = await fetchLists(apiType, 'ingredients');
    console.log(ingredientList[key].slice(0, INGREDIENTS_NUM));
    return ingredientList[key].slice(0, INGREDIENTS_NUM);
  };

  useEffect(() => {
    getIngredients()
      .then((response) => {
        setIngredients(response);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header name="Explorar Ingredientes" search={ false } apiType={ apiType } />
      <section className="section-up">
        {ingredients.map((ingredient, index) => (
          <IngredientCard
            key={ index }
            index={ index }
            apiType={ apiType }
            ingredient={ ingredient }
          />
        ))}
      </section>
      <Footer apiType={ apiType } />
    </>
  );
}

ExploreByIngredients.propTypes = {
  apiType: PropTypes.string.isRequired,
};

export default ExploreByIngredients;
