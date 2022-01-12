import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import RecommendedCard from './RecommendedCard';
import fetchRecipe from '../../services/api';
import 'swiper/swiper-bundle.css';
import './style.css';

export default function MealsDetails({ mealInfo, ingredientsKeys, measuresKeys }) {
  const magicNumber = 6;
  const magicBool = true;
  const [recommended, setRecommended] = useState('');
  const [isDone, setIsDone] = useState(false);
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

  const checkDone = () => {
    const doneR = localStorage.getItem('doneRecipes');
    // if (doneR && doneR.length !== 0) {
    //   const a = doneR.filter((el) => el.id === idMeal);
    //   return a.length !== 0 ? setIsDone(true) : setIsDone(false);
    // }
  };

  useEffect(() => {
    fetchRecommended();
    // fetchDoneRecipes();
    checkDone();
  }, []);

  SwiperCore.use([Navigation]);

  return (
    <main className="detail-main">
      <div className="img-div">
        <img
          data-testid="recipe-photo"
          src={ strMealThumb }
          alt=""
          className="meal-img"
        />
      </div>
      <div className="description-div">
        <div className="title-fav-share-div">
          <h4 data-testid="recipe-title" className="title">{`${strMeal}`}</h4>
          <div className="share-fav-div">
            <button type="button" data-testid="share-btn">Compartilhar</button>
            <button type="button" data-testid="favorite-btn">Favoritar</button>
          </div>
        </div>
        <h4
          className="category"
          data-testid="recipe-category"
        >
          {`${strCategory}`}
        </h4>
        <h4 className="id">{`${idMeal}`}</h4>
        <h5>Ingredients</h5>
        <ul data-testid="recipe-category" className="ingredients">
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
        <p data-testid="instructions" className="instructions">{`${strInstructions}`}</p>
        <h5>Video</h5>
        <video
          src={ strYoutube }
          data-testid="video"
          width="400"
          height="300"
          controls="controls"
          autoPlay="no"
          className="video"
        >
          <track kind="captions" />
        </video>
        <h6 className="recommended">Receitas Recomendadas</h6>
        <Swiper
          slidesPerView={ 1 }
          navigation={ magicBool }
          centeredSlides={ magicBool }
          className="mySwiper"
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

        {isDone ? <div /> : (
          <Link to={ `/comidas/${idMeal}/in-progress` }>
            <button
              type="button"
              data-testid="start-recipe-btn"
              className="start-recipe-button"
            >
              Iniciar Receita
            </button>
          </Link>
        )}
      </div>
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
