import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import ProfileIcon from '../../images/profileIcon.svg';
import SearchIcon from '../../images/searchIcon.svg';
import RecipesContext from '../../context/RecipesContext';
import './style.css';

export default function Header({ name, search }) {
  const { setRenderBar } = useContext(RecipesContext);

  const handleClick = () => {
    setRenderBar((re) => !re);
  };
  return (
    <header className="header">
      <Link to="/perfil" data-testid="profile-top-btn">
        <img
          src={ ProfileIcon }
          alt="profile"
        />
      </Link>
      <h2 data-testid="page-title">{ name }</h2>
      {search ? (
        <button type="button" onClick={ handleClick } className="search-btn">
          <img
            src={ SearchIcon }
            alt="search"
            data-testid="search-top-btn"
          />
        </button>
      ) : <div />}
    </header>
  );
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  search: PropTypes.bool.isRequired,
};
