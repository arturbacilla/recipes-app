import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import fetchRecipe from '../../services/api';

function SearchBar({ apiType, history }) {
  const [searchInput, setSearchInput] = useState('');
  const [ratioContent, setRatioContent] = useState('');
  const [ratioValue, setRatioValue] = useState(false);
  const [obj, setobj] = useState({});

  useEffect(() => {
    setRatioValue(true);
  }, []);

  const handleChangeBar = ({ target }) => {
    const { value } = target;
    setSearchInput(value);
  };

  const handleChangeRatio = ({ target }) => {
    const { id, checked } = target;
    if (checked) {
      setRatioContent(id);
      return id !== 'name' ? setRatioValue(false) : setRatioValue(true);
    }
  };

  const handleClick = async () => {
    const oob = await fetchRecipe(apiType, ratioContent, searchInput);
    setobj(oob);
    console.log(obj);
  };

  return (
    <div className="searchBar-container">

      <div className="searchBar">
        <input
          type="text"
          name="barra"
          data-testid="search-input"
          value={ searchInput }
          onChange={ handleChangeBar }
        />
        <button
          type="button"
          className="searchBar-btn"
          data-testid="exec-search-btn"
          onClick={ handleClick }
        >
          Buscar
        </button>
      </div>
      <ul className="searchBar-radios">
        <li data-testid="name-search-radio">
          <label htmlFor="name">
            Nome
            <input
              type="radio"
              name="selection"
              id="name"
              checked={ ratioValue }
              onChange={ handleChangeRatio }
            />
          </label>
        </li>
        <li data-testid="ingredient-search-radio">
          <label className="radio-selection" htmlFor="ingredient">
            Ingrediente
            <input
              type="radio"
              name="selection"
              id="ingredient"
              onChange={ handleChangeRatio }
            />
          </label>
        </li>
        <li data-testid="first-letter-search-radio">
          <label htmlFor="letter">
            Primeira letra
            <input
              type="radio"
              name="selection"
              id="letter"
              onChange={ handleChangeRatio }
            />
          </label>
        </li>
      </ul>
    </div>
  );
}

SearchBar.propTypes = {
  apiType: PropTypes.string.isRequired,
};

export default SearchBar;
