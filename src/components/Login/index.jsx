import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  const handleChange = ({ target }) => {
    const { id, value } = target;
    if (id === 'user') {
      setLogin(value);
    } else {
      setPassword(value);
    }
  };

  const handleClick = () => {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email: login }));
  };

  useEffect(() => (JSON.parse(!localStorage.getItem('doneRecipes')) && (
    localStorage.setItem('doneRecipes', JSON.stringify([])))), []);

  useEffect(() => (JSON.parse(!localStorage.getItem('favoriteRecipes')) && (
    localStorage.setItem('favoriteRecipes', JSON.stringify([])))), []);

  useEffect(() => {
    const testeLogin = /\S+@\S+\.\S+/;
    const magic = 7;
    const teste = testeLogin.test(login) && password.length >= magic;
    setIsDisabled(!teste);
  }, [login, password]);

  return (
    <div>

      <label htmlFor="user">
        Usuário
        <input id="user" data-testid="email-input" onChange={ handleChange } />
      </label>

      <label htmlFor="password">
        Senha
        <input
          id="password"
          type="password"
          data-testid="password-input"
          onChange={ handleChange }
        />
      </label>

      <Link to="/comidas">
        <button
          type="button"
          data-testid="login-submit-btn"
          disabled={ isDisabled }
          onClick={ handleClick }
        >
          Entrar
        </button>
      </Link>
    </div>
  );
}
