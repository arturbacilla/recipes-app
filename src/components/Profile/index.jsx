import React from 'react';
import { Link } from 'react-router-dom';
import './profile.css';

export default function index() {
  const { email } = JSON.parse(localStorage.getItem('user'));

  return (
    <div>
      <div className="profile-header">
        <h3 data-testid="profile-email">{`User: ${email}`}</h3>
        <Link to="/receitas-feitas">
          <button
            type="button"
            data-testid="profile-done-btn"
          >
            Receitas Feitas
          </button>
        </Link>
        <Link to="/receitas-favoritas">
          <button
            type="button"
            data-testid="profile-favorite-btn"
          >
            Receitas Favoritas
          </button>
        </Link>
        <Link to="/">
          <button
            type="button"
            data-testid="profile-logout-btn"
            onClick={ () => localStorage.clear() }
          >
            Sair
          </button>
        </Link>
      </div>
    </div>
  );
}
