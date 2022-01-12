import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import RecommendedCard from './RecommendedCard';
import fetchRecipe from '../../services/api';
import 'swiper/swiper-bundle.css';
import './DetailsStyle.css';

export default function MealsDetails({ mealInfo, ingredientsKeys, measuresKeys }) {
  const magicNumber = 6;
  const magicBool = true;
  const [recommended, setRecommended] = useState('');
  // const [isDone, setIsDone] = useState(false);
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

  // const checkDone = () => {
  //   const doneR = localStorage.getItem('doneRecipes');
  //   // if (doneR && doneR.length !== 0) {
  //   //   const a = doneR.filter((el) => el.id === idMeal);
  //   //   return a.length !== 0 ? setIsDone(true) : setIsDone(false);
  //   // }
  // };

  useEffect(() => {
    fetchRecommended();
    // fetchDoneRecipes();
    // checkDone();
  }, []);

  SwiperCore.use([Navigation]);

  return (
    <main className="details-drink-detail-main">
      <img
        data-testid="recipe-photo"
        src={ strMealThumb }
        alt=""
        className="details-meal-img"
      />
      <div className="details-minus-img-div">
        <div className="details-description-div">
          <h4 data-testid="recipe-title" className="details-title">{`${strMeal}`}</h4>
          <div className="details-share-fav-div">
            <button type="button" data-testid="share-btn">Compartilhar</button>
            <button type="button" data-testid="favorite-btn">Favoritar</button>
          </div>
        </div>
        <h4
          className="details-category"
          data-testid="recipe-category"
        >
          {`${strCategory}`}
        </h4>
        <h4 className="details-id">{`${idMeal}`}</h4>
        <h5>Ingredients</h5>
        <ul data-testid="recipe-category" className="details-ingredients">
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
        <h5>Instructions</h5>
        <p
          data-testid="instructions"
          className="details-instructions"
        >
          {`${strInstructions}`}
        </p>
        <h5>Video</h5>
        <video
          src={ strYoutube }
          data-testid="video"
          width="400"
          height="300"
          controls="controls"
          autoPlay="no"
          className="details-video"
        >
          <track kind="captions" />
        </video>
        <h6 className="details-recommended-title">Receitas Recomendadas</h6>
        <div className="details-swiper-div">
          <Swiper
            slidesPerView={ 1 }
            navigation={ magicBool }
            centeredSlides={ magicBool }
            className="details-mySwiper"
          >
            <ul className="details-recommended-div">
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
        </div>
      </div>

      <Link to={ `/comidas/${idMeal}/in-progress` }>
        <button
          type="button"
          data-testid="start-recipe-btn"
          className="details-start-recipe-button"
        >
          Iniciar Receita
        </button>
      </Link>
    </main>
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
