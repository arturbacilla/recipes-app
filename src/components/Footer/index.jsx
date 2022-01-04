import React from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';
import DrinkIcon from '../../images/drinkIcon.svg';
import ExploreIcon from '../../images/exploreIcon.svg';
import MealIcon from '../../images/mealIcon.svg';

function Footer() {
  return (
    <footer data-testid="footer">
      <div className="foot-config">
        <Link to="/bebidas">
          <img
            src={ DrinkIcon }
            alt="drinks"
            data-testid="drinks-bottom-btn"
          />
        </Link>
        <Link to="/explorar">
          <img
            src={ ExploreIcon }
            alt="explore"
            data-testid="explore-bottom-btn"
          />
        </Link>
        <Link to="/comidas">
          <img
            src={ MealIcon }
            alt="meals"
            data-testid="food-bottom-btn"
          />
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
