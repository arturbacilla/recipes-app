import React from 'react';
import PropType from 'prop-types';
import { Link } from 'react-router-dom';
import '../../App.css';
import DrinkIcon from '../../images/drinkIcon.svg';
import ExploreIcon from '../../images/exploreIcon.svg';
import MealIcon from '../../images/mealIcon.svg';

function Footer({ apiType }) {
  return (
    <footer data-testid="footer" className={ `${apiType}-colors` }>
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

Footer.propTypes = {
  apiType: PropType.string.isRequired,
};

export default Footer;
