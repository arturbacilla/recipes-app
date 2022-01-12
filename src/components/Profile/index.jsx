import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../Footer';
import Header from '../Header';
import './profile.css';

export default function index() {
  let email = 'undefined';
  if (JSON.parse(localStorage.getItem('user')) !== null) {
    email = JSON.parse(localStorage.getItem('user')).email;
  }

  return (
    <div className="profile-container">
      <Header name="Perfil" search={ false } apiType="generic" />
      <h3 data-testid="profile-email">{`User: ${email}`}</h3>
      <div className="profile-header">
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
      <Footer apiType="generic" />
    </div>
  );
}
