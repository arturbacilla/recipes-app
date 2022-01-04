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
        <Link to="/bebidas" data-testid="drinks-bottom-btn">
          <img
            src={ DrinkIcon }
            alt="drinks"
          />
        </Link>
        <Link to="/explorar" data-testid="explore-bottom-btn">
          <img
            src={ ExploreIcon }
            alt="explore"
          />
        </Link>
        <Link to="/comidas" data-testid="food-bottom-btn">
          <img
            src={ MealIcon }
            alt="meals"
          />
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
