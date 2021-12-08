import React from 'react';

function SearchBar() {
  return (
    <div className="searchBar-container">
      <div className="searchBar">
        <input type="text" name="" data-testid="search-input" />
      </div>
      <ul className="searchBar-radios">
        <li data-testid="ingredient-search-radio">
          <label htmlFor="ingredient">
            Ingrediente
            <input type="radio" name="selection" id="ingredient" />
          </label>
        </li>
        <li data-testid="name-search-radio">
          <label htmlFor="name-radio">
            Nome
            <input type="radio" name="selection" id="name-radio" />
          </label>
        </li>
        <li data-testid="first-letter-search-radio">
          <label htmlFor="first_letter">
            Primeira letra
            <input type="radio" name="selection" id="first_letter" />
          </label>
        </li>
      </ul>
      <div>
        <button type="button" data-testid="exec-search-btn">buscar</button>
      </div>
    </div>
  );
}

export default SearchBar;
