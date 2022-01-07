import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import RecommendedCard from './RecommendedCard';
import fetchRecipe from '../../services/api';
import 'swiper/swiper-bundle.css';

export default function MealsDetails({ mealInfo, ingredientsKeys, measuresKeys }) {
  const magicNumber = 6;
  const magicBool = true;
  const [recommended, setRecommended] = useState('');
  const ingredients = ingredientsKeys.map((ingr) => mealInfo[ingr]);
  const {
    strMeal,
    strMealThumb,
    idMeal,
    strCategory,
    strInstructions,
    strYoutube,
  } = mealInfo;

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
    const recipe = await fetchRecipe('cocktail', '', '');
    setRecommended(recipe);
  }

  useEffect(() => {
    fetchRecommended();
  }, []);

  SwiperCore.use([Navigation]);

  return (
    <div>
      <h4 data-testid="recipe-title">{`Name: ${strMeal}`}</h4>
      <img
        data-testid="recipe-photo"
        src={ strMealThumb }
        alt=""
        style={ { width: '200px' } }
      />
      <h4>{`Id: ${idMeal}`}</h4>
      <button type="button" data-testid="share-btn">Compartilhar</button>
      <button type="button" data-testid="favorite-btn">Favoritar</button>
      <h4
        data-testid="recipe-category"
      >
        {`Categoria: ${strCategory}`}
      </h4>
      <h5>Vídeo:</h5>
      <video
        src={ strYoutube }
        data-testid="video"
        width="400"
        height="300"
        controls="controls"
        autoPlay="no"
      >
        <track kind="captions" />
      </video>
      track
      <h5>Ingredientes:</h5>
      <ul data-testid="recipe-category">
        {filterIngredients(ingredients).map((ingr, i) => (
          <li
            data-testid={
              `${i}-ingredient-name-and-measure`
            }
            key={ ingr }
          >
            {`${mealInfo[measuresKeys[i]]} of ${ingr}`}
          </li>
        ))}
      </ul>
      <h5>Instruções:</h5>
      <p data-testid="instructions">{`${strInstructions}`}</p>
      <h6>Receitas Recomendadas:</h6>
      <Swiper
        slidesPerView={ 2 }
        navigation={ magicBool }
      >
        <ul className="recommended-div">
          { recommended && recommended.drinks.map((drink, i) => (
            i < magicNumber && (
              <SwiperSlide>
                <li
                  key={ drink.idDrinks }
                  // className="recommend-thumb"
                  data-testid={ `${i}-recomendation-card` }
                >
                  <RecommendedCard
                    recipe={ recommended.drinks[i] }
                    index={ i }
                    apiType="cocktail"
                  />
                </li>
              </SwiperSlide>
            )
          ))}
        </ul>
      </Swiper>

      <button
        type="button"
        onClick={ () => console.log(recommended) }
        data-testid="start-recipe-btn"
      >
        Iniciar Receita
      </button>
    </div>
  );
}

MealsDetails.propTypes = {
  ingredientsKeys: PropTypes.string.isRequired,
  mealInfo: PropTypes.shape({
    idMeal: PropTypes.string.isRequired,
    strCategory: PropTypes.string.isRequired,
    strInstructions: PropTypes.string.isRequired,
    strMeal: PropTypes.string.isRequired,
    strMealThumb: PropTypes.string.isRequired,
    strYoutube: PropTypes.string.isRequired,
  }).isRequired,
  measuresKeys: PropTypes.string.isRequired,
};
