import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import ProfileIcon from '../../images/profileIcon.svg';
import SearchIcon from '../../images/searchIcon.svg';
import RecipesContext from '../../context/RecipesContext';
import './style.css';

export default function Header({ name, search, apiType }) {
  const { setRenderBar } = useContext(RecipesContext);

  const handleClick = () => {
    setRenderBar((re) => !re);
  };
  return (
    <header className={ `${apiType}-colors` }>
      <Link to="/perfil">
        <img
          data-testid="profile-top-btn"
          src={ ProfileIcon }
          alt="profile"
        />
      </Link>
      <h2 data-testid="page-title">{ name }</h2>
      {search ? (
        <button type="button" onClick={ handleClick } className="search-btn">
          <img
            data-testid="search-top-btn"
            src={ SearchIcon }
            alt="search"
          />
        </button>
      ) : <div className="ghost-div" />}
    </header>
  );
}

Header.propTypes = {
  apiType: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  search: PropTypes.bool.isRequired,
};
