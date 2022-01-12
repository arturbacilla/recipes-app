import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import fetchRecipe from '../../services/api';
import Header from './Header';
import './style.css';
import Ingredients from './Ingredients';
import Instructions from './Instructions';
import FinishButton from './FinishButton';

export default function RecipeInProgress(props) {
  const { match: { path, params: { id } } } = props;
  const [data, setData] = useState({});
  const KEY_INPROGRESS = 'inProgressRecipes';
  const KEY_DONERECIPE = 'doneRecipes';
  const endpoint = path.split('/');
  const type = endpoint[1] === 'bebidas' ? 'cocktail' : 'meal';
  const loadType = type === 'meal' ? 'meals' : 'drinks';

  useEffect(() => {
    const DEFAULT_RECIPES = {
      cocktails: {},
      meals: {},
    };
    const typeOfRecipe = () => {
      // tira ro fetch da funcao fetchRecipe e jogar aqui dentro, faz o fetch dar retorno
      fetchRecipe(type, 'id', id)
        .then((response) => setData(response));
    };

    const checkLocalStorage = () => {
      const inProgress = localStorage.getItem(KEY_INPROGRESS);
      const doneRecipe = localStorage.getItem(KEY_DONERECIPE);
      if (!inProgress) {
        localStorage.setItem(KEY_INPROGRESS, JSON.stringify(DEFAULT_RECIPES));
      }
      if (!doneRecipe) {
        localStorage.setItem(KEY_DONERECIPE, JSON.stringify([]));
      }
    };
    typeOfRecipe();
    checkLocalStorage();
  }, [id, type]);

  return (
    <section>
      {
        !data[loadType] ? 'Loading...' : (
          <>
            <Header data={ data } type={ type } />
            <Ingredients data={ data } type={ type } id={ id } />
            <Instructions data={ data } type={ type } />
            <FinishButton data={ data } type={ type } />
          </>
        )
      }
    </section>
  );
}

RecipeInProgress.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
