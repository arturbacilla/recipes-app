import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import ProfileIcon from '../../images/profileIcon.svg';
import SearchIcon from '../../images/searchIcon.svg';
import RecipesContext from '../../context/RecipesContext';
import './style.css';

export default function Header({ name }) {
  const { setRenderBar } = useContext(RecipesContext);

  const handleClick = () => {
    setRenderBar((re) => !re);
  };
  return (
    <header className="header">
      <Link to="/perfil">
        <img
          src={ ProfileIcon }
          alt="profile"
          data-testid="profile-top-btn"
        />
      </Link>
      <h2 data-testid="page-title">{ name }</h2>
      <button type="button" onClick={ handleClick } className="search-btn">
        <img
          src={ SearchIcon }
          alt="search"
          data-testid="search-top-btn"
        />
      </button>
    </header>
  );
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
};
