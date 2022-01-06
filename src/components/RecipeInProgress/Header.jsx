import React from 'react';
import PropTypes from 'prop-types';

export default function Header(props) {
  const { data, type } = props;
  const typeOfEdible = [['strDrink', 'strDrinkThumb', 'strCategory'],
    ['strMeal', 'strMealThumb', 'strCategory']];
  const headerType = type === 'cocktail' ? 'drinks' : 'meals';
  const headerData = headerType === 'drinks' ? typeOfEdible[0] : typeOfEdible[1];
  // const { strMeal: title, strMealThumb: mealImg, strCategory } = meals[0];

  return (
    <header className="recipe-head-container">
      <img
        src={ data[headerType][0][headerData[1]] }
        alt="edible"
        data-testid="recipe-photo"
      />
      <div className="recipe-title">
        <h2 data-testid="recipe-title">{ data[headerType][0][headerData[0]] }</h2>
        <div>
          <button type="button" data-testid="share-btn">share</button>
          <button type="button" data-testid="favorite-btn">favorite</button>
        </div>
      </div>
      <p data-testid="recipe-category">{ data[headerType][0][headerData[2]] }</p>
    </header>
  );
}
