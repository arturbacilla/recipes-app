import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import './style.css';
import searchFoodImg from '../../images/icons/search_food.png';
import searchDrinkImg from '../../images/icons/search_drink.png';

function Explore() {
  return (
    <div className="explore-wrap">
      <Header name="Explorar" search={ false } apiType="generic" />
      <div className="explore-main">
        <Link to="/explorar/comidas" title="Icons made by Freepik">
          <img
            src={ searchFoodImg }
            alt="Ícone de uma lupa e um hamburger"
            className="icon"
          />
          <button type="button" data-testid="explore-food">Explorar Comidas</button>
        </Link>
        <Link to="/explorar/bebidas" title="Icons made by Freepik">
          <img
            src={ searchDrinkImg }
            alt="Ícone de uma lupa e um café"
            className="icon"
          />
          <button type="button" data-testid="explore-drinks">Explorar Bebidas</button>
        </Link>
      </div>
      <Footer apiType="generic" />
    </div>
  );
}

export default Explore;
