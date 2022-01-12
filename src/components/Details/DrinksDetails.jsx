import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import RecommendedCard from './RecommendedCard';
import fetchRecipe from '../../services/api';
import '../../App.css';
import 'swiper/swiper-bundle.css';

export default function DrinksDetails({ drinkInfo, ingredientsKeys, measuresKeys }) {
  const magicNumber = 6;
  const magicBool = true;
  const [recommended, setRecommended] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const ingredients = ingredientsKeys.map((key) => drinkInfo[key]);
  const { strDrink, strDrinkThumb, idDrink, strInstructions, strAlcoholic } = drinkInfo;

  function filterIngredients(array) {
    const filtered = [];
    array.forEach((curr) => {
      if (curr !== null && curr !== '') {
        filtered.push(curr);
      }
    });

    return filtered;
  }

  async function fetchRecommended() {
    const recipe = await fetchRecipe('meals', '', '');
    setRecommended(recipe);
  }

  // function fetchDoneRecipes() {
  //   const recipes = localStorage.getItem('doneRecipes');
  //   const array = JSON.parse(recipes);
  //   setIsDone(array.some((recipe) => recipe.id === idDrink));
  // }

  const checkDone = () => {
    setIsDone(false);
    // if (doneR && doneR.length !== 0) {
    //   const a = doneR.filter((el) => el.id === idDrink);
    //   return a.length !== 0 ? setIsDone(true) : setIsDone(false);
    // }
  };

  useEffect(() => {
    fetchRecommended();
    checkDone();
    // fetchDoneRecipes();
  }, []);

  SwiperCore.use([Navigation]);

  return (
    <main className="drink-detail-main">
      <h4 data-testid="recipe-title">{`Name: ${strDrink}`}</h4>
      <img
        data-testid="recipe-photo"
        src={ strDrinkThumb }
        alt=""
        style={ { width: '200px' } }
      />
      <h4>{`Id: ${idDrink}`}</h4>
      <button type="button" data-testid="share-btn">Compartilhar</button>
      <button type="button" data-testid="favorite-btn">Favoritar</button>
      <h4
        data-testid="recipe-category"
      >
        {`Categoria: ${strAlcoholic}`}
      </h4>
      <h5>Ingredientes</h5>
      <ul data-testid="recipe-category">
        {filterIngredients(ingredients).map((ingr, i) => (
          <li
            data-testid={
              `${i}-ingredient-name-and-measure`
            }
            key={ i }
          >
            {`${drinkInfo[measuresKeys[i]]} of ${ingr}`}
          </li>
        ))}
      </ul>
      <h5>Instruções:</h5>
      <p data-testid="instructions">{`${strInstructions}`}</p>
      <h6>Receitas Recomendadas:</h6>
      <Swiper
        slidesPerView={ 1 }
        navigation={ magicBool }
      >
        <ul className="recommended-div">
          { recommended ? (recommended.meals.map((meal, i) => (
            i < magicNumber && (
              <SwiperSlide>
                <li
                  key={ meal.idMeal }
                  // className="recommend-thumb"
                  data-testid={ `${i}-recomendation-card` }
                >
                  <RecommendedCard recipe={ recommended.meals[i] } index={ i } />
                </li>
              </SwiperSlide>
            )
          ))) : null }
        </ul>
      </Swiper>

      {isDone ? <div /> : (
        <Link to={ `/bebidas/${idDrink}/in-progress` }>
          <button
            type="button"
            data-testid="start-recipe-btn"
            className="start-recipe-button"
          >
            Iniciar Receita
          </button>
        </Link>
      )}
    </main>
  );
}

DrinksDetails.propTypes = {
  drinkInfo: PropTypes.shape({
    idDrink: PropTypes.string.isRequired,
    strAlcoholic: PropTypes.string.isRequired,
    strDrink: PropTypes.string.isRequired,
    strDrinkThumb: PropTypes.string.isRequired,
    strInstructions: PropTypes.string.isRequired,
  }).isRequired,
  ingredientsKeys: PropTypes.string.isRequired,
  measuresKeys: PropTypes.string.isRequired,
};
